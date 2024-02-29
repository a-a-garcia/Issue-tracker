// import + export in one go
export { default } from 'next-auth/middleware';

// set the config options to define in which routes should middleware be applied
export const config = {
    // an array of paths
    matcher: [
        '/issues/new',
        // `+` is a modifier, anything that comes after edit, one or more parameters, will be protected
        '/issues/edit/:id+'
    ]
}