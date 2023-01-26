const host = "http://localhost:5000";

const registerRoute = `${host}/api/auth/register`;
const loginRoute = `${host}/api/auth/login`;
const setAvatarRoute = `${host}/api/auth/setavatar`;
const setAllUsersRoute = `${host}/api/auth/allusers`;
const sendMessageRoute = `${host}/api/messages/addmsg`;
const getAllMessagesRoute = `${host}/api/messages/getmsg`;
const getProfileRoute = `${host}/api/auth/profile`;

export {
    host,
    registerRoute,
    loginRoute,
    setAvatarRoute,
    setAllUsersRoute,
    sendMessageRoute,
    getAllMessagesRoute,
    getProfileRoute
}