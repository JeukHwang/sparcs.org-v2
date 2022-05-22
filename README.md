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

mobile 환경 고려 UI

https://stackoverflow.com/questions/42199956/how-to-implement-debounce-in-vue2
https://jsfiddle.net/chrisvfritz/0dzvcf4d/

https://studiomeal.com/archives/197

https://codepen.io/kowlor/pen/wgLEvj

markdown scroll sync