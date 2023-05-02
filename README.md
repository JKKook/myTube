# react youtube clone

https://gilded-tiramisu-d388f7.netlify.app/

<img src='./public/asset/myyoutube.gif'>

### 들어가며

프로젝트를 작업하게 된 이유는 그 동안 리액트 지식을 바탕으로 API를 활용하고자 진행하게 되었습니다.

### Youtube API 정리

- **키워드 검색**
  https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=[YOUR_API_KEY]
  <br>

- **핫트렌드 비디오들**
  https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=[YOUR_API_KEY]
  <br>

- **연관된 비디오 검색**
  https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=Ks-_Mh1QhMc&type=video&maxResults=25&key=[YOUR_API_KEY]
  <br>

- **채널 상세내용**
  https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=UC_x5XG1OV2P6uZZ5FSM9Ttw&key=[YOUR_API_KEY]
  <br>

### UI 구조 및 경로

video의 최상위 컴포넌트는 root가 담당하며,

- index true인 경우 videos
- videos/:keyword ⇒ videos
- videos/watch/:videoId ⇒ videosDetail

### 프로젝트 특징

유튜브 클론 프로젝트의 특징은, 실제 유튜브 API와 샘플인 데이터 즉 만들어진 가짜 API의 혼용을 하면서 작업할 수 있다는 점입니다.
위 과정을 하기 위해서 실제와 가짜 데이터 동시에 관리할 수 있어야 합니다.

### 배웠던 문제 해결 방법

API의 전체적인 관리를 위해서 Context를 활용하는데, 이 때 생기는 의존성주입에 대한 이슈 해결입니다.

1. 비슷한 관심사라면 함께 두기
   : 비슷한 관심사 즉 깊은 의존성을 지닌 것들끼리는 한 폴더에 관리하는 것이 효율적이다. (이러한 습관들은 스파게티 코드로 인한 오류를 방지할 가능성이 농후하다)
2. 데이터를 ID기반으로 정리하기
   : Client에서 데이터를 ID를 기반으로해서 관리 시, 큰 이점이 있다. 바로 상위 컴포넌트에서 해당 데이터의 \*[스키마](https://itwiki.kr/w/%EC%8A%A4%ED%82%A4%EB%A7%88)(Constructor of DataBase)를 알 필요가 없고, ID만 내려주면 하위 컴포넌트가 원하는 데이터에 바로 접근할 수 있다는 점이다.
3. 의존성 그대로 드러내기
   : 의존성을 prop 구조에 그대로 드러내면, 컴포넌트 의존 구조가 명확히 보이고 어떻게 의존성을 느슨하게 만들어야 하는지 눈에 보인다. 그래서 의존 관계를 prop 구조나 이름에 그대로 드러내는 것이 좋다.
