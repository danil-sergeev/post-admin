export const ensureIsAuthenticated = async(ctx, next) => {
    if (ctx.isAuthenticated()) { return next(); };
    ctx.redirect('/login');
};  