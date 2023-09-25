function saveElementInfo(className, IdName, url) {
    chrome.storage.local.get("removedElements", function(result) { // 요소 정보 가져오기
      var removedElements = result.removedElements || []; // <====(단축평가) 정보 or 빈배열 할당
      removedElements.push({ class: className, id: IdName, url: url }); // 새로운 정보 푸시
      chrome.storage.local.set({ removedElements: removedElements }); // 저장
    });
  }