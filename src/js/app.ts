
//import { game } from './game'

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

export let ctx: CanvasRenderingContext2D
export let keys: { [key: string]: boolean; } = {}

let image = new Image()
let m_func: Function = (r: number, g: number, b: number, a: number) => [r, g, b, a]

export let app = {
	formula: <HTMLTextAreaElement>null,
	canvas: <HTMLCanvasElement>null,
	link: <HTMLLinkElement>null,
	assets: <HTMLImageElement[]>[],
	setup() {
		this.formula = document.getElementById('formula')
		this.canvas = document.getElementById('canvas')
		this.link = document.getElementById('executor')

		this.formula.value = 'return [r, g, b, a];'

		this.link.onclick = () => {
			try {
				let k = `
					'use strict';
					let r = arguments[0]
					let g = arguments[1]
					let b = arguments[2]
					let a = arguments[3]
					let x = arguments[4]
					let y = arguments[5]
					let w = arguments[6]
					let h = arguments[7]

					let min = Math.min
					let max = Math.max
					let floor = Math.floor
					let abs = Math.abs
				`
				m_func = new Function(k + this.formula.value)
			} catch (e) {
				alert(e.message);
			}

			//console.log()
		}

		this.update()
		this.addEventLiteners()

		image.src = 'assets/basic.png'

		//mod_image.data = image.data
	},
	update() {
		this.canvas.width = 800 //window.innerWidth
		this.canvas.height = 200 // window.innerHeight

		ctx = this.canvas.getContext("2d")
		ctx.imageSmoothingEnabled = false

		// Black Background
		ctx.fillStyle = 'black'
		ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

		// Image

		ctx.drawImage(image, 30, 30, 160, 160)
		ctx.drawImage(image, 200, 30, 20, 20)
		//ctx.drawImage(mod_image, 230, 30, 160, 160)
		//ctx.drawImage(mod_image, 300, 30, 20, 20)

		const imageData = ctx.getImageData(200, 30, 20, 20)
		const data = imageData.data;

		for (var i = 0; i < data.length; i += 4) {
			/*data[i] = 255 - data[i]
			data[i + 1] = 255 - data[i + 1]
			data[i + 2] = 255 - data[i + 2]*/

			const [r, g, b, a] = m_func.call(null,
				data[i], data[i + 1], data[i + 2], data[i + 3],
				(i / 4) % imageData.width, Math.floor(i / (4 * imageData.width)), imageData.width, imageData.height)

			data[i + 0] = r
			data[i + 1] = g
			data[i + 2] = b
			data[i + 3] = a
		}

		ctx.putImageData(imageData, 230, 30);

		for (var i = 0; i < data.length; i += 4) {
			ctx.fillStyle = `rgba(${data[i]}, ${data[i + 1]}, ${data[i + 2]}, ${data[i + 3] / 255})`
			ctx.fillRect(
				260 + 8 * ((i / 4) % imageData.width),
				30 + 8 * Math.floor(i / 4 / imageData.width),
				8, 8)
		}
	},
	gameLoop() {
		requestAnimationFrame(this.gameLoop.bind(this))
		this.update()
		//game.update()
		//game.render()
		//lobby.update()
		//lobby.render()
	},
	addEventLiteners() {
		// document.addEventListener('mouseover', event => {})

		document.addEventListener('keydown', event => {
			//game.onKeyDown(event)
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
			//game.onClick(event)
			//lobby.onClick(event)
		})

	}
}

window.onload = () => {
	app.setup()
	app.gameLoop()
}
