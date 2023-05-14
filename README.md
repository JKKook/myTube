# react youtube clone

https://gilded-tiramisu-d388f7.netlify.app/

<img src='./public/asset/myyoutube.gif'>

### 들어가며

프로젝트를 작업하게 된 이유는 그 동안 리액트 지식을 바탕으로 API를 활용하고자 진행하게 되었습니다.

### Youtube API 정리

-   **키워드 검색**
    https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=[YOUR_API_KEY]
    <br>

-   **핫트렌드 비디오들**
    https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=[YOUR_API_KEY]
    <br>

-   **연관된 비디오 검색**
    https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=Ks-_Mh1QhMc&type=video&maxResults=25&key=[YOUR_API_KEY]
    <br>

-   **채널 상세내용**
    https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=UC_x5XG1OV2P6uZZ5FSM9Ttw&key=[YOUR_API_KEY]
    <br>

### UI 구조 및 경로

video의 최상위 컴포넌트는 root가 담당하며,

-   index true인 경우 videos
-   videos/:keyword ⇒ videos
-   videos/watch/:videoId ⇒ videosDetail

### 프로젝트 특징

유튜브 클론 프로젝트의 특징은, 실제 유튜브 API와 샘플인 데이터 즉 만들어진 가짜 API의 혼용을 하면서 작업할 수 있다는 점입니다.
위 과정을 하기 위해서 실제와 가짜 데이터 동시에 관리할 수 있어야 합니다.

### 배웠던 문제 해결 방법

1. **처음 접하는 프로그래밍 언어 및 라이브러리 등을 학습하는 방법을 배웠습니다.**  
   누구나 처음 접하는 것들을 누군가는 사용할 수 있고, 누군가는 사용할 수 없는 것은 실력적인 부분도 분명히 있겠지만, 그것보다 더 큰 것은 학습 방법의 차이 때문이라고 느꼈습니다. 기본 개념의 이해 없이 타인의 코드를 보고 적용하는 것보다 프로그래밍이 만들어진 이유와 공식사이트에서 권장하는 가이드를 천천히 따라가면서 학습 및 적용하는 것이 좀 더 체득하기에 좋은 방법이라고 이번 프로젝트를 통해 깨닫게 되었습니다.
2. **API를 다루는 방식에 대해 배웠습니다.**
   리액트 tanstack 쿼리와 리액트 라우팅을 통해 API를 쉽게 호출하고 받아온 데이터를 props로 전달하는 방법을 배웠고, fetch와 axios의 차이점을 리팩터링하는 과정에서 인지하게 되었습니다. 또한 내부로직의 노출을 방지해야 한다는 것을 이번 프로젝트 계기로 알게 되었습니다.
