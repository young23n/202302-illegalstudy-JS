/* !해당 주석으로 요구사항 파트를 표시했습니다!  */  
chrome.runtime.onMessage.addListener(function(message) { // 메세지를 받았을 때 이벤트 
    if (message === "apply") {  
      Inspector(function(obj) {/* !콜백! */
        $(obj).css("display", "none"); // 요소제거하기
        alert("class: "+ obj.class + " id: "+ obj.id +" url: " + window.location.href)
        saveElementInfo(obj.class, obj.id, window.location.href); // 요소 정보 저장
      });
    }
    else if(message === "cancel"){
      cancelRemove();
    }
  });
  
  //popup.html에 있는 버튼이 눌릴때 활성화
  var Inspector = function(cb) { 
    //style 요소 생성
    var style = document.createElement('style');
  
    //slyle에 마우스를 올리면 활성화될 css 넣기
    style.innerHTML = '.overTargetClass { border: 2px solid green !important; }';
  
    //stlye 속성을 문서에 추가
    document.getElementsByTagName('head')[0].appendChild(style);
  
    //전부 설정(설정에 따라 p나 div 같은 요소 지정할 수 있음)
    var targets = "*"; 
  
    // 이벤트 리스너
    $("body").on("mouseenter", targets, activeFocus)
             .on("mouseleave", targets, deactiveFocus)
             .on("click", targets, onclick);
  
  
    //클릭시 
    function onclick(e) {
      e.preventDefault();  // 클릭시 해당 요소의 기본 행동 제거(하이퍼링크 클릭시 해당 사이트로 이동하지 못하게 하는 등)
      e.stopPropagation();  // 이벤트 버블링 차단(자식의 행동이 부모에게 가지 못 하도록)
      deactiveFocus.call(this, e);// 마우스가 떠날 때 함수 호출(클릭 후 종료 해야하니)
      $("body")//이벤트 제거
          .off("mouseenter", activeFocus)
          .off("mouseleave", deactiveFocus)
          .off("click", onclick);
      cb(this);//클릭한 요소를 전달
      return;
    }
  
    //마우스가 요소 내부로 들어올 때
    function activeFocus(e) {
      if (e) {
        e.stopPropagation();//버블링제거
      }
  
      var $this = $(this);
      $this.addClass("overTargetClass");// 요소에 그리기
  
      var clickDefine = $this.attr("onclick"); //onclick 함수와, 이벤트의 click 과 동시에 작동되면 안되니 잠시 다른 이름으로 변경
      if (clickDefine) {
        $this.attr("data-org-click", clickDefine);
        $this.removeAttr("onclick");
      }
      /** 부모 요소는 선택되지 않도록 하기 
       * div2를 감싸고 있는 div1이 있다면 div2를 선택하기 위해 div1을 거쳐야함
       * 이때 mouseenter이벤트가 발생하고 div2로 이동할때 div1에선 mouseleave 이벤트가 발생하지 않기 때문
       *  */ 
      $this.parents(targets).each(function() {
        deactiveFocus.call(this);
      });
    }
  
    //마우스가 요소를 떠날 때
    function deactiveFocus(e) {
      if (e) {
        e.stopPropagation();
      }
  
      var $this = $(this);
      $this.removeClass("overTargetClass"); // 요소에 그려둔 테두리 제거
  
      var clickDefine = $this.attr("data-org-click"); // 이름을 바꿔놨던 onclick 이벤트 복구
      if (clickDefine) {
        $this.attr("onclick", clickDefine);
        $this.removeAttr("data-org-click");
      }
    }
  };
  
  function saveElementInfo(className, IdName, url) {
    chrome.storage.local.get("removedElements", function(result) { // 요소 정보 가져오기
      var removedElements = result.removedElements || []; // 정보 or 빈배열 할당
      removedElements.push({ class: className, id: IdName, url: url }); // 새로운 정보 푸시
      chrome.storage.local.set({ removedElements: removedElements }); // 저장
    });
  }
  
  function removeElements() {
  chrome.storage.local.get("removedElements", (result) => { /* !화살표함수! */
    var removedElements = result.removedElements || []; //결과값 가져오기
    var currentUrl = window.location.href;  //현재 활성탭의 주소 가져오기
    removedElements.forEach(function(element) { // 순회하면서 비교
      if (element.url === currentUrl) { // 맞으면 해당 요소제거
        if (element.class) {
          $("." + element.class).css("display", "none"); 
        }
        if (element.id) {
          $("#" + element.id).css("display", "none");
        }
      }
    });
  });
  removeElements(); /** !재귀! */
}
  
  function cancelRemove(){
    chrome.storage.local.get("removedElements", function(result){
      var removedElements = result.removedElements || []; // 로컬에 저장된 정보 불러오기(없다면 빈배열)
      if (removedElements.length > 0) { 
        var lastRemoved = removedElements.pop(); // 가장 마지막에 제거된 요소 가져오기
    
        if (lastRemoved.class) {
          $("." + lastRemoved.class).css("display", ""); // 요소 복구
        }
        if (lastRemoved.id) {
          $("#" + lastRemoved.id).css("display", ""); // 요소 복구
        }
    
        // 복구한 요소를 저장소에서도 제거
        chrome.storage.local.get("removedElements", function(result) {
          var storedRemovedElements = result.removedElements || [];
          storedRemovedElements = storedRemovedElements.filter(function(element) {
            return element.class !== lastRemoved.class || element.id !== lastRemoved.id; /** !리턴값! */
          });
          chrome.storage.local.set({ removedElements: storedRemovedElements });
        });
        alert("취소 되었습니다.");
      }
      else{
        alert("더 이상 취소할 것이 없습니다.");
      }
    })
    
  }
  
  removeElements(); 