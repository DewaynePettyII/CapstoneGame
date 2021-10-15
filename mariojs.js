kaboom({
    global: true,
    fullscreen: true,
    scale: 1,
    debug: true,
    clearColor: [0, 0, 0, 1],  
})


const MOVE_SPEED = 120
const JUMP_FORCE = 360
const BIG_JUMP_FORCE =550
let CURRENT_JUMP_FORCE = JUMP_FORCE
let isJumping = true
const FALL_DEATH = 780

loadRoot('https://i.imgur.com/')
loadSprite('coin', 'wbKxhcd.png')
loadSprite('goomba', 'LmseqUG.png')
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
loadSprite('boss-goomba', 'SvV4ueD.png')
loadSprite('blue-brick', '3e5YRQd.png')

scene("game", ({ level , score }) => {
    layers(['bg', 'obj', 'ui'],'obj')

    const maps = [
       [                                                    
        '       =================================================================================   ',
        '                                                     ====              ===             =  ',
        '                                                     ====              === ^^^^^^^^^^^ =  ',
        '                                                       ====           ==== ^^^^^^^^^^% =  ',
        '                                                          ================ ^^^^^^^^^^^ =  ',
        '                                                                           ^^^^^^^^^^^ =  ',
        '                                                                           ^^^^^^^^^^^ =  ',
        '                                                                           ^^^^^^^^^^^ =  ',
        '                   &                               =====================================  ',
        '                                                   ===  ',
        '                                                   ===  ',
        '                                                   ===  ',
        '                  ===                           &&%===  ',
        '                                                   ===  ',
        '             ^^^   *   ^^^       *                 ===   ',
        '=======================================   ============   ',
        '                                          ==  ',
        '                                          == ',
        '                                          ==  ',
        '                                          ==  ',
        '              ===========     ============== ',
        '                              =            =  ',
        '       =====               ====            =  ',
        '^^^    =                 ====              = ',   
        '===    =               ===                 =  ',
        '       =             ===                   =  ',
        '     ^^=&&&        ===                 12 ==',
        '    ====                                  ==',
        '       =                               34 ==',
        '^^     =====================================',
        '===                                                                                        ',
        '  =                                                                                         ',
        '  =  ^8^^^^^^^8                                                                           ',
        '  ==========================================                                               ',
        '                                                                                    ',
        '                                                                                    ',
        '                                                                                    ',
       ],
      [
      '                                                     ',
      '                                                     ',
      '                               &&&                   ', 
      '                                                     ',
      '                                                     ',
      '                                                     ',
      '                              =========               ',
      '                             ====                     ',
      '                            =====                   =',
      '                           ======                   =',
      '                          =======                   =',
      '                         ========  ^^^^^^^          =',
      '                        ===================         =',
      '                       =                           %=',
      '                 =======                            =',
      '                 =                             &&&  =',
      '                 =                                  =',
      '                 =                       * ^^^^^^^^ =',
      '                 =          ^^^^  ===================',
      '                 =        ======                    = ',
      '          %      =                                  = ',
      '                 =                                  = ',
      '       ===========                                  =                       ==============             ',
      '                                                    =                       =            =  ',
      '                                                    =                       =            =      ',
      '                      ============                  =                       =        12  =      ',
      '           %          =                             =========================            =                          ',
      '                      =                                                            ==34  =     ',
      '         *     *      = ^^^^^^^                                                  ====    =     ',
      '==========================================================================================       ',
      '                                                     ',
      '                                                     ',
      '                                                     ',
      '                                                     ',
      ],
      [
        
        '                                                    x',  
        '                                                    x',
        '                                                    x',
        'x                                                   x',
        'x                                                   x',
        'x                                                   x',  
        'x                                                   x',
        'x                                                   x',
        'x                          <                        x',
        'x                                              12   x',
        'x                                                   x',
        'x                                           xx 34   x',
        'x                                          xxx      x',
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      ]  
    ]

    const levelCfg = {
        width: 20,
        height: 20,
        '=': [sprite('brick'), solid()],
        '+': [sprite('block'), solid()],
        '1': [sprite('pipe-top-left'), solid(), 'pipe'],
        '2': [sprite('pipe-top-right'), solid(), 'pipe'],
        '3': [sprite('pipe-bottom-left'), solid()],
        '4': [sprite('pipe-bottom-right'), solid()],
        '-': [sprite('unboxed'), solid()],
        '*': [sprite('goomba'), solid(), 'dangerous', body()],
        '8': [sprite('goomba'), solid(), 'enemy', body()],
        "<": [sprite('boss-goomba'), solid(), 'dangerous', body(), scale(2.5)],
        '^': [sprite('coin'), 'coin'],
        '@': [sprite('mushroom'), solid(), 'mushroom', body()],
        '&': [sprite('surprise'), solid(), 'coin-surpise'],
        '%': [sprite('surprise'), solid(), 'mushroom-surpise'],
        'x': [sprite('blue-brick'), solid()],

    }

    const gamelevel = addLevel(maps[level], levelCfg)
    
    const scoreLabel = add([
        text(score),
        pos(15, 6),
        layer('ui'),
        {
            value: score,
        }
    ])

    add([text('level' + parseInt(level + 1)), pos(40, 6)])

    function big() {
        let timer = 0
        let isBig = false
        return {
            update() {
                if (isBig) {
                    timer -=dt()
                    if (timer <= 0) {
                        this.smallify()
                    }
                }
            },
            isBig() {
                return isBig
            },
            smallify() {
                this.scale = vec2(1)
                CURRENT_JUMP_FORCE = JUMP_FORCE
                timer = 0
                isBig = false
            },
            biggify(time) {
                this.scale = vec2(2)
                CURRENT_JUMP_FORCE = BIG_JUMP_FORCE
                timer = time
                isBig = true
            }
        }
    }

    const player = add([
        sprite('mario'), solid(),
        pos(30, 0),
        body(),
        big(),
        origin('bot')
    ])

    action('mushroom', (m) => {
        m.move(-25, 0)
    })

    player.on("headbump", (obj) => {
        if (obj.is('coin-surpise')) {
            gamelevel.spawn('^', obj.gridPos.sub(0, 1))
            destroy(obj)
            gamelevel.spawn('+', obj.gridPos.sub(0,0))
        }
        if (obj.is('mushroom-surpise')) {
            gamelevel.spawn('@', obj.gridPos.sub(0, 1))
            destroy(obj)
            gamelevel.spawn('+', obj.gridPos.sub(0,0))
        }
    })

    const ENEMY_SPEED = 20

    action('dangerous', (d) => {
        d.move(-ENEMY_SPEED, 0)
    })

    action('enemy', (e) => {
        e.move(ENEMY_SPEED, 0)
    })

    action('boss', (b) => {
        b.move(ENEMY_SPEED, 0(7), -ENEMY_SPEED, 0(7))
    })

    player.collides('mushroom', (m) => {
        destroy(m)
        player.biggify(6)
    })

    player.collides('coin', (c) => {
        destroy(c)
        scoreLabel.value++
        scoreLabel.text = scoreLabel.value
    })

    player.collides('dangerous',  (d) => {
        if (isJumping) {
            destroy(d)
        } else {
            go('lose', { score: scoreLabel.value})
        }  
    })

    player.collides('enemy',  (e) => {
        if (isJumping) {
            destroy(e)
        } else {
            go('lose', { score: scoreLabel.value})
        }  
    })

    player.action(() => {
        camPos(player.pos)
        if (player.pos.y >= FALL_DEATH) {
        go('lose', {score: scoreLabel.value})
        }
    })

    player.collides('pipe', ()=> {
        keyPress('down', () => {
            go('game', {
                level: (level + 1) % maps.length,
                score: scoreLabel.value
            })
        })
    })

    keyDown('left', () => {
        player.move(-MOVE_SPEED, 0)
    })

    keyDown('right', () => {
        player.move(MOVE_SPEED, 0)
    })

    player.action(() => {
        if (player.grounded()) {
            isJumping = false
        } 
    })

    keyPress('space', () => {
        if (player.grounded()){
            isJumping = true 
            player.jump(CURRENT_JUMP_FORCE)
        }
    })

})

scene('lose', ({ score }) => {
    add([text(score, 32), origin ('center'), pos(width()/2, height()/ 2)])
})

start("game", { level: 0 , score: 0 },)