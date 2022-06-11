
export const logOut = async ( req, res, next)=> {
res.clearCookie('access_token');
res.send('user logout successfully');
};

