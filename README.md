# bloter-quiz
기사 내용의 이해를 돕기 위한 방법의 일부로 독자와 상호작용 할 수 있는 퀴즈를 만들 수 있는 플러그인 입니다.

Bloter Quiz
============

기사 내용의 이해를 돕기 위한 방법으로 독자와 상호작용 할 수 있는 퀴즈를 만드는 워드프레스 플러그인 입니다. 숏코드 형태로 글에 삽입하여 사용하도록 되어 있고, 작성의 편의를 돕기 위해 에디터에 숏코드를 간편히 추가할 수 있는 버튼과 타임라인 작성 폼을 따로 구성하였습니다.

## 설치
압축된 zip 형태의 소스파일을 다운 받아서 워드프레스의 플러그인 추가하기에서 `플러그인 업로드`를 통해 업로드 할 수 있습니다. 플러그인 업로드를 할 수 없는 환경이라면 다운 받은 소스파일의 압축을 풀어 직접 FTP를 이용해 워드프레스의 `wp-content/plugins` 폴더 하위에 폴더 째로 업로드 하면 됩니다.

## 사용법
에디터에 추가된 퀴즈 삽입 버튼을 클릭하면 퀴즈를 작성할 수 있는 폼이 나옵니다.

![alt tag](http://bloter.github.io/resources/img/bloter-quiz-icon-in-editor.png)

형식은 퀴즈형과 설문형 두가지를 제공하며 선택지는 갯수에 제한이 없습니다.

퀴즈형은 선택지 중 하나를 정답으로 설정할 수 있습니다. 중복으로 정답을 설정할 경우 정상적으로 동작하지 않을 수 있습니다. - 2015.5.13

![alt tag](http://bloter.github.io/resources/img/bloter-quiz-create-form.png)

설문형과 퀴즈형에 입력하는 설문, 퀴즈 내용에는 HTML 태그를 직접 사용할 수 있습니다. 관련기사나 정답해설은 설문, 퀴즈에 참여하고 난 뒤에 보이는 내용입니다.

생성된 퀴즈는 에디터에 이미지 박스 형태로 입력됩니다.
![alt tag](http://bloter.github.io/resources/img/bloter-quiz-created-and-insert.png)

생성된 이미지 박스를 클릭하면 입력된 내용을 수정할 수 있도록 내용이 입력된 폼이 나옵니다. 이를 통해 이전에 입력했던 내용을 손쉽게 수정할 수 있습니다.
![alt tag](http://bloter.github.io/resources/img/bloter-quiz-edit.png)

## 보이는 모습
퀴즈 참여 전
![alt tag](http://bloter.github.io/resources/img/bloter-quiz-view-before-vote.png)

퀴즈 참여 후
![alt tag](http://bloter.github.io/resources/img/bloter-quiz-view-after-vote.png)

어떤 선택지를 얼마나 선택했는지 비율을 볼 수 있습니다. 퀴즈에 참여한 사람 수도 함께 보여집니다.

## 주의사항
현재 버전에서는 퀴즈 작성시 순서를 변경할 수 없습니다. 추후 순서 변경을 지원할 예정이나 그 전까지 사용시에는 처음 작성할 때 신중하게 작성해야 합니다.

## 필요한 라이브러리
- jQuery
- jQuery UI
- FontAwesome
- Glyphicons
