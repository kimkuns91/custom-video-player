import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    name: string;
    profileImageUrl: string | null;
    provider?: string;
    createdAt: Date;
    updatedAt: Date;
  }

  interface Profile {
    id: string;  // 추가된 부분
    properties: {
      nickname: string;
      profile_image: string;
    };
    kakao_account: {
      email: string;
    };
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image: string;
      provider?: string;
    };
    accessToken?: string;
    accessTokenExpires?: number;
    error?: string;
  }
}
