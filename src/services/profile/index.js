export default [
    {
        method: 'get',
        path: '/',
        handler: (req, res) => {
            res.send('home get');
        }
    }
];