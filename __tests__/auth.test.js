import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createMocks } from 'node-mocks-http'; 


jest.mock('next-auth', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockNextAuth = NextAuth;


const credentialsProviderMock = {
  name: 'Credentials',
  credentials: {
    username: { label: "Username", type: "text" },
    password: { label: "Password", type: "password" },
  },
  authorize: jest.fn(),
};

describe("NextAuth Authentication", () => {
  it("should return a session for valid credentials", async () => {
    credentialsProviderMock.authorize.mockResolvedValueOnce({
      id: 1,
      name: "Admin User",
      email: "admin@example.com"
    });

    
    mockNextAuth.mockResolvedValueOnce({
      providers: [CredentialsProvider(credentialsProviderMock)],
    });

    const { req, res } = createMocks({
      method: "POST",
    });

    await mockNextAuth(req, res);

    
    expect(credentialsProviderMock.authorize).toHaveBeenCalledWith({
      username: 'admin',
      password: '1234',
    });

    expect(res._getData()).toMatchObject({
      user: {
        id: 1,
        name: 'Admin User',
        email: 'admin@example.com'
      },
    });
  });

  it("should return null for invalid credentials", async () => {
    credentialsProviderMock.authorize.mockResolvedValueOnce(null);  

    
    mockNextAuth.mockResolvedValueOnce({
      providers: [CredentialsProvider(credentialsProviderMock)],
    });

    const { req, res } = createMocks({
      method: "POST",
    });

    await mockNextAuth(req, res);

    
    expect(credentialsProviderMock.authorize).toHaveBeenCalledWith({
      username: 'admin',
      password: 'wrong-password',
    });

    
    expect(res._getData()).toMatchObject({
      error: "Invalid credentials",
    });
  });
});
