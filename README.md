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
