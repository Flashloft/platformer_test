controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.vy == 0) {
        mySprite.vy = -150
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.chestClosed, function (sprite, location) {
    tiles.setTileAt(location, sprites.dungeon.chestOpen)
    projectile = sprites.createProjectileFromSprite(img`
        . . b b b . . . 
        . b 5 5 5 b . . 
        b 5 d 3 d 5 b . 
        b 5 3 5 1 5 b . 
        c 5 3 5 1 d c . 
        c 5 d 1 d d c . 
        . f d d d f . . 
        . . f f f . . . 
        `, mySprite, 0, -50)
    tiles.placeOnTile(projectile, location)
})
sprites.onCreated(SpriteKind.Projectile, function (sprite) {
    sprite.startEffect(effects.smiles, 200)
    music.baDing.play()
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleRedCrystal, function (sprite, location) {
    if (tiles.getTilesByType(sprites.dungeon.chestClosed).length == 0) {
        game.over(true)
    }
})
let projectile: Sprite = null
let mySprite: Sprite = null
scene.setBackgroundColor(12)
tiles.setTilemap(tiles.createTilemap(hex`1e000a00010000000003000000000000000000000000000000000000000000020001010000000101000300000300000300000000000300000000000000000001010003000000000100000100000101010000010101010000000101010101010101000300000003000000000000000000000000000000000000000001010000000101000001010003000003000000000300000000030000000001010000000000000000000001000001010000000101000000010100000001010004000000030000030000000003000000030000000300000000030001010101000001010000010100000101000001010100000101000001010001010000000000000000000000000000000000000000000000000000000001010101010101010101010101010101010101010101010101010101010101`, img`
    2 . . . . . . . . . . . . . . . . . . . . . . . . . . . . 2 
    2 . . . 2 2 . . . . . . . . . . . . . . . . . . . . . . . 2 
    2 . . . . . . 2 . . 2 . . 2 2 2 . . 2 2 2 2 . . . 2 2 2 2 2 
    2 2 2 . . . . . . . . . . . . . . . . . . . . . . . . . . 2 
    2 . . . 2 2 . . 2 2 . . . . . . . . . . . . . . . . . . . 2 
    2 . . . . . . . . . . 2 . . 2 2 . . . 2 2 . . . 2 2 . . . 2 
    2 . . . . . . . . . . . . . . . . . . . . . . . . . . . . 2 
    2 2 2 . . 2 2 . . 2 2 . . 2 2 . . 2 2 2 . . 2 2 . . 2 2 . 2 
    2 . . . . . . . . . . . . . . . . . . . . . . . . . . . . 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    `, [myTiles.transparency16,sprites.builtin.brick,sprites.dungeon.collectibleRedCrystal,sprites.dungeon.chestClosed,sprites.dungeon.chestOpen], TileScale.Sixteen))
for (let 值 of tiles.getTilesByType(sprites.dungeon.chestOpen)) {
    tiles.setTileAt(值, sprites.dungeon.chestClosed)
}
mySprite = sprites.create(img`
    . . . . . . . . . . . . . 
    . . . f f f f f f . . . . 
    . f f f f f f f f f . . . 
    . f f f f f f c f f f . . 
    f f f f c f f f c f f f . 
    f c f f c c f f f c c f f 
    f c c f f f f e f f f f f 
    f f f f f f f e e f f f . 
    f f e e f b f e e f f . . 
    . f e 4 e 1 f 4 4 f f . . 
    . f f f e e 4 4 4 f . . . 
    . . f e 4 4 e e f f . . . 
    . . f e 4 4 e 7 7 f . . . 
    . f f f e e f 6 6 f f . . 
    . f f f f f f f f f f . . 
    . . f f . . . f f f . . . 
    `, SpriteKind.Player)
mySprite.setFlag(SpriteFlag.StayInScreen, true)
mySprite.ay = 300
tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 8))
controller.moveSprite(mySprite, 100, 0)
scene.cameraFollowSprite(mySprite)
