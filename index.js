import mojo from '@mojojs/core';

const app = mojo();

app.get('/').to({controller: 'tetris', action: 'init'})

app.start();