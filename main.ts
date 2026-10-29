input.onPinTouchEvent(TouchPin.P1, input.buttonEventDown(), function () {
    basic.setLedColor(0x00ff00)
    basic.showLeds(`
        # . . . .
        # # # . .
        . . # . .
        . # # . .
        . # . . .
        `)
})
input.onPinTouchEvent(TouchPin.P2, input.buttonEventDown(), function () {
    basic.setLedColor(0x00ff00)
    basic.showLeds(`
        # . . . .
        # # # . .
        . . # . .
        . . # # .
        . . . # .
        `)
})
input.onPinTouchEvent(TouchPin.P3, input.buttonEventDown(), function () {
    basic.setLedColor(0x00ff00)
    basic.showLeds(`
        # . . . .
        # # # . .
        . . # . .
        . . # # #
        . . . . .
        `)
})
let Info = false
let adc = 0
let m1 = 0
let m2 = 0
let m3 = 0
let Leerlauf = false
let Spannung = 0
let Analogwert = 0
basic.forever(function () {
    if (Spannung < 0.1) {
        Leerlauf = false
        basic.showNumber(0)
    } else if (Spannung < 2) {
        Leerlauf = false
        basic.showNumber(Spannung, 60)
    } else if (Spannung < 2.25) {
        Leerlauf = true
        basic.showLeds(`
            . . # . .
            . # # # .
            . # . # .
            . # . # .
            . # # # .
            `)
        basic.showLeds(`
            . . # . .
            . # # # .
            . # . # .
            . # # # .
            . # # # .
            `)
        basic.showLeds(`
            . . # . .
            . # # # .
            . # # # .
            . # # # .
            . # # # .
            `)
    } else {
        Leerlauf = false
        basic.showNumber(Math.round(Spannung * 10) / 10, 100)
    }
})
basic.forever(function () {
    m3 = m2
    m2 = m1
    m1 = pins.analogReadPin(AnalogPin.P0)
    adc = (m1 + m2 + m3) / 3
    Spannung = 3.3 / 1023 * adc
    basic.pause(100)
    if (Spannung < 0.5) {
        basic.setLedColors(0x000000, 0x000000, 0x000000)
    } else if (Spannung < 1) {
        basic.setLedColors(0x330000, 0x000000, 0x000000)
    } else if (Spannung < 1.1) {
        basic.setLedColors(0xff0000, 0x000000, 0x000000)
    } else if (Spannung < 1.2) {
        basic.setLedColors(0xff8000, 0x000000, 0x000000)
    } else if (Spannung < 1.3) {
        basic.setLedColors(0xffff00, 0x000000, 0x000000)
    } else if (Spannung < 1.4) {
        basic.setLedColors(0xffff00, 0xffff00, 0x000000)
    } else if (Spannung < 1.5) {
        basic.setLedColors(0x00ff00, 0x00ff00, 0x000000)
    } else if (Spannung < 1.7) {
        basic.setLedColors(0x00ff00, 0x00ff00, 0x00ff00)
    } else if (Spannung < 3.2) {
        basic.setLedColors(0x000033, 0x000033, 0x000033)
    } else {
        basic.setLedColors(0x660044, 0x660044, 0x660044)
    }
})
basic.forever(function () {
    if (Leerlauf) {
        for (let index = 0; index <= 99; index++) {
            basic.pause(100)
            if (!(Leerlauf)) {
                Info = false
                break;
            }
            if (index == 99) {
                Info = true
            }
        }
        if (Info) {
            basic.showString(" Verbinde P0 mit Batterie ", 60)
            basic.showLeds(`
                . . # . .
                . . # . .
                # # # # #
                . . # . .
                . . # . .
                `)
            Info = false
        }
    }
})
