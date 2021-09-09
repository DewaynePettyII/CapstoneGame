kaboom({
    global: true,
    fullscreen: true,
    scale: 1,
    debug: true,
    clearColor: [0, 0, 0, 1],  
})

const MOVE_SPEED = 120
const JUMP_FORCE = 360

loadRoot('https://i.imgur.com/')
loadSprite('coin', 'wbKxhcd.png')
loadSprite('goomba', 'KP03fR9.png')
loadSprite('brick', 'pogC9x5.png')
loadSprite('block', 'bdrLpi6.png')
loadSprite('mario', 'Wb1qfhK.png')
loadSprite('mushroom', '0wMd92p.png')
loadSprite('surprise', 'gesQ1KP.png')
loadSprite('unboxed', 'bdrLpi6.png')
loadSprite('pipe-top-left', 'ReTPiWY.png')
loadSprite('pipe-top-right', 'hj2GK4n.png')
loadSprite('pipe-bottom-left', 'c1cYSbt.png')
loadSprite('pipe-bottom-right', 'nqQ79eI.png')

scene("game", () => {
    layers(['bg', 'obj', 'ui'],'obj')

    const map = [
        '                                                    ',
        '                                                    ',
        '                                                    ',
        '                                                    ',
        '                                                    ',
        '                                                    ',
        '                                                    ',
        '                                                   =',
        '                   &                               =',
        '                                                   =',
        '                                                   =',
        '                  ===                           ++&=',
        '                                                   =',
        '             ^^^       ^^^                         =',
        '=======================================   ==========',
        '                                          =         ',
        '                                          =         ',
        '                                          =         ',
        '                                          =         ',
        '              ===========     ====  =======         ',
        '                              =                     ',
        '       =====              =====                     ',
        '^^^    =                ====                        ',   
        '===    =              ===                           ',
        '       =            ===                             ',
        '     ^^=+&+       ===                               ',
        '    ====         ===                                ',
        '       =       ===                                  ',
        '^^     =========                                    ',
        '===                                                 ',
        '                                                    ',
        '    ^^^^^^^^^                                       ',
        '   ============                                     ',
        '                                                    ',
        '                                                    ',
        '                                                    ',
        '                                                    ',
        '                                                    ',
        '                                                    ',
        '                                                    ',
        '                                                    ',
        '                                                    ',
        '                                                    ',
        '                                                    ',
        '                                                    ',
        '                                                    ',
        '                                                    ',
    ]

    const levelCfg = {
        width: 20,
        height: 20,
        '=': [sprite('brick'), solid()],
        '+': [sprite('block'), solid()],
        '1': [sprite('pipe-top-left')],
        '2': [sprite('pipe-top-right')],
        '3': [sprite('pipe-bottom-left')],
        '4': [sprite('pipe-bottom-right')],
        '-': [sprite('unboxed', solid())],
        '*': [sprite('goomba', solid())],
        '^': [sprite('coin')],
        '&': [sprite('surprise'), solid()],

    }

    const gamelevel = addLevel(map, levelCfg)

    const scroreLabel = add([
        text('test'),
        pos(30, 6),
        layer('ui'),
        {
            value: 'test',
        }
    ])

    add([text('level' + 'test', pos (4,6))])

    const player = add([
        sprite('mario'), solid(),
        pos(30, 0),
        body(),
        origin('bot')
    ])

    keyDown('left', () => {
        player.move(-MOVE_SPEED, 0)
    })

    keyDown('right', () => {
        player.move(MOVE_SPEED, 0)
    })

    keyPress('space', () => {
        if (player.grounded()){
            player.jump(JUMP_FORCE)
        }
    })

})

start("game")