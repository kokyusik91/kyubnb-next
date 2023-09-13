# Airbnb clone with Next.js 13.4 🏚

## 실행방법

```shell
npm install

npm run dev
```

## 만드는 과정

### 1. GNB 만들기

거의다 `use client`로 선언하여 클라이언트 컴포넌트로 만들었다. onClick, useState등이 있으면 클라이언트 컴포넌트로 만드는건 알겠는데 그거 없는 것들은 왜 클라이언트 컴포넌트로 만들까?

### 2. Modal 만들기

Modal의 상태는 커스텀 훅 + zustand의 전역 상태 관리로 열었다 닫았다를 한다. 왜냐하면 여러 컴포넌트에서 모달이 열리는 것을 핸들링 해야하기 때문이다.
<br/>

예시코드 : 커스텀훅 + zustand

```tsx
import { create } from 'zustand';

interface RegisterModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRegisterModal = create<RegisterModalStore>((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRegisterModal;
```

### 3. 현재까지의 최상단 `Layout.tsx`

```tsx
return (
    <html lang='en'>
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          {/* <Modal actionLabel='Submit' title='hello world' isOpen={true} /> */}
          <NavBar />
        </ClientOnly>
        {children}
      </body>
    </html>
```

- `ClientOnly` 래퍼 컴포넌트를 만들어서 하이드레이션 에러가 나지 않게했다. 오직 클라이언트 컴포넌트에서만 랜더링
- `react-hot-toast`를 설치해서 `ClientOnly` 래퍼 컴포넌트안에서 Provider로 선언하여 사용하고 있다.

## 4. prisma 셋팅

### prisma 설치

```shell
npm install -D prisma
```

### prisma 시작

```shell
npx prisma init
```

## 5. Auth 구현 (로그인, 회원가입 with Next-auth) 과정

1. Prisma를 사용해서 DB Schema를 만든다. (/prisma/schema.prisma 참고)
2. next-auth를 사용하기 위해서 어쩔수 없이 `pages 디렉토리`를 만든다. (사용하기 위해 어쩔 수 없었음)
3. `/page/api/auth/[...nextauth].ts`에 next-auth 관련 로직을 넣어준다. (이게 복잡함.... 🥲)
4. /app/api/register/route.ts에 POST요청인 회원가입 로직을 넣는다 (DB에 신규 유저 생성 with prisma), 실제 회원가입 API를 만드는 과정.
5. `Signup`과는 다르게 `Login`은 `credentials`라는 것을 사용([...nextauth]에 선언되어있는)해서 로그인 로직 및 onSumbit핸들러를 작성한다.
6. ServerComponent의 특성을 이용하여 로그인 한 유저정보를 DB에서 다이렉트로 가져온다. (서버 컴포넌트이니깐 가능한점!!) 이렇게 되면 API 콜을 안해도된다는 이점이 있다!!
7. 서버 컴포넌트에서 가져온 `currentUser`를 클라이언트 컴포넌트에 props로 넘겨준다! 🥰
8. 가져온 유저정보로 로그인시 보여줄 메뉴들을 조건부 렌더링 하여 보여줄 수 있다.
9. 로그아웃은 `next-auth`의 signOut 함수만 호출하면 자동으로 로그아웃이 된다. (엄청 편함.)
