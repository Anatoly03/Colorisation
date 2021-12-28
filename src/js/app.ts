
import { game } from './game'
import lobby from './screens/start'

// 
// LOOK INTO
//
// https://www.spriters-resource.com/pc_computer/touhoufuujinrokumountainoffaith/sheet/51905/
// https://www.spriters-resource.com/mobile/touhoulostword/sheet/157108/
// https://www.spriters-resource.com/pc_computer/swr/sheet/21146/
// https://www.spriters-resource.com/pc_computer/swr/sheet/14707/
// https://www.spriters-resource.com/pc_computer/touhoupuppetdanceperformancetouhoumon/sheet/103792/
// https://www.spriters-resource.com/search/?q=touhou
//

export let DEBUG_MODE: boolean

export let width: number
export let height: number
export let canvas: HTMLCanvasElement
export let ctx: CanvasRenderingContext2D
export let keys: { [key: string]: boolean; } = {}

let lastCalledTime = Date.now();
let delta = 1;
export let FPS = 0;

export let app = {
	setup() {
		canvas = <HTMLCanvasElement>document.getElementById('canvas')
		this.update()
		this.updateFPS()
		this.addEventLiteners()
		game.init()
		//lobby.init()
	},
	update() {
		width = canvas.width = window.innerWidth
		height = canvas.height = window.innerHeight
		ctx = canvas.getContext("2d")
		ctx.imageSmoothingEnabled = false

		// Black Background
		ctx.fillStyle = 'black'
		ctx.fillRect(0, 0, width, height)
	},
	updateFPS() {
		FPS = 1 / delta
		setTimeout(() => {
			this.updateFPS()
		}, 100)
	},
	gameLoop() {
		delta = (Date.now() - lastCalledTime) / 1000;
		lastCalledTime = Date.now();
		requestAnimationFrame(this.gameLoop.bind(this))
		this.update()
		game.update()
		game.render()
		//lobby.update()
		//lobby.render()
	},
	addEventLiteners() {
		// document.addEventListener('mouseover', event => {})

		document.addEventListener('keydown', event => {
			game.onKeyDown(event)
			//lobby.onKeyDown(event)
			keys[event.key.toLowerCase()] = true
			if (keys['f3']) {
				DEBUG_MODE = !DEBUG_MODE
			}
		})

		document.addEventListener('keyup', event => {
			delete keys[event.key.toLowerCase()]
		})

		document.addEventListener('click', event => {
			game.onClick(event)
			//lobby.onClick(event)
		})

		/*document.addEventListener('mousedown', event => {
			//
		})

		document.addEventListener('mouseup', event => {
			//
		})

		document.addEventListener('mousemove', event => {
			//game.onClick(event)
			game.onMouseMove(event)
		})*/


	}
}

window.onload = () => {
	app.setup()
	app.gameLoop()
}
