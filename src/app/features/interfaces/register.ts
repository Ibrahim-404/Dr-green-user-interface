export interface Register {
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  userType: number,
  phoneNumber: string,
  userRole: [
    {
      roleId: number
    }
  ]
}
