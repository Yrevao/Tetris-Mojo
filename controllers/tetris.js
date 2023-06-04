export default class TetrisController {
    // when a user first opens the webpage with the tetris game on it
    async init(ctx) {
        await ctx.render({view: 'tetris', layout: 'index'})
    }
}