const apiRoutes = {
  otp: "/identity/account/otp",
  otpConfirm: "/identity/account/otp-confirm",
  login: "/identity/account/login",
  register: "/identity/account/register",
  profile: "/identity/account/profile",
  refreshToken: "/identity/account/refresh-token",
  meetingRooms: "/meeting-room",
  meetingRoom(id: string | number) {
    return `/meeting-room/${id}`;
  },
  user(id: string | number) {
    return `/identity/users/${id}`;
  },
  meetingRoomBook: "/meeting-room/book",
  users: "/identity/users/",
  personalBookings: "/meeting-room/bookings",
};

export default apiRoutes;
