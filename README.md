# How to start
```
npm install
npm install -D @webpack-cli/serve --force
npx browserslist@latest --update-db
npm run dev
```
Project is running at http://localhost:8080/

- Legacy directory structure
Frontend(Vue) : ./app/*
Backend(Express) : any other file
# What's the problem in legacy project
이후 공홈 react 기반 migration이 이루어질 때 반영할 사항
- Seminars
    - 한 번에 모든 세미나 정보를 다 가져와서 꽤 느림
    - query 구현하기는 간단하겠지만 지속가능한가?
    - 역순 버튼 대신에 같은 버튼 두 번 누르기 (Jan 다음에 붙는 svg 화살표 뒤집기)
    - 일부 버튼의 경우 hover 적용 안 됨
    - unicode로 가능한 문제 지나치게 svg로 해결?

Applink focus 되었는지 알기 어려워서 키보드 tab으로 빠른 조작하기 어려움 
scss &__blahblah{} 로 쓰는 경우가 있는데 줄여서 보기는 쉽고 html 상에서 어떻게 들어있나 보기는 좋으나 
scss 문법에 대해 긍정적 입장
component로 떼기에는 작지만 className이 많이 길어지는 애매한 경우가 존재

디자인의 통일성? page 크기를 정해놓고 minus margin으로 title이 view를 넘어감

영어 단어의 과도한 이용; 우리말을 사랑합시다; 그리 어렵지 않다
i18n - 영어 지원은 왜 안 하는가?

alert level 분홍색 색깔?
color palette 세심한 설정 및 통일할 수 있는 공간이 필요; 실시간으로 바뀐 색깔 확인할 수 있는! - 전용 개발자 도구 제작!, 간단하게 제작 가능 
linter 통일 필요성, 개인 설정 의존 중인 듯...

markdown editor 더러운 update.... somebody help me!

i18n의 장점을 살려 전역 관리 -> 말투를 일정하게, js에도 쓸 수 있도록

기본 폰트 숫자 표시 이상함; 고정폭이나 align 불가능
# Specification
```
# Post title
## Issue
- Type : Unexpected issue, Scheduled maintenance, ...
- When : 2022.05.16 03:50
- What : Login form does not work

## Update
- When : 2022.05.16 04:00
- What : Hotfix for network frontend bug

## Update
- When : 2022.05.16 05:50
- What : Refactoring hotfix update

# Monitoring
- When : 2022.05.17 12:30
- What : back to normal, currently monitoring

# Resolved
- When : 2022.05.18 14:00
- What : Login form works

# Reflection
- When : 2022.05.18 15:00
## Why issue happen?
- Poor unit test
- miscommunication during code review

## What should be done to prevent a recurrence of the situation?
- Force unit test by blocking commit without it
- Automate unit test
- Make documentation for code reviewers
- Write the result of code review in Github
- Make slack notifier that shows reviewer's comment 
    - [Related slack official docs](https://slack.com/intl/ko-kr/help/articles/115005265703)
```
[Heroku status](https://status.heroku.com/incidents/2090)

# TODO
window resize시에 grid one column으로 바꾸기

안쪽 margin vs 바깥쪽 padding 차이?

`mobile 환경 고려 UI`

https://stackoverflow.com/questions/42199956/how-to-implement-debounce-in-vue2
https://jsfiddle.net/chrisvfritz/0dzvcf4d/

https://studiomeal.com/archives/197

https://codepen.io/kowlor/pen/wgLEvj

markdown scroll sync - too hard

VERY GOOD refence : https://studiomeal.com/archives/533

very good 구문 : `grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));`

parent, child 간 좋은 형태의 통신! : https://whitepro.tistory.com/255

api() 에 대한 try catch는 일관성이 없어서 logic 제대로 확인한 이후 수정 필요