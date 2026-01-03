/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#2C6E49', // Forest Green
					foreground: '#F5F0EC' // Soft Sand
				},
				secondary: {
					DEFAULT: '#C9B79C', // Wheat Brown
					foreground: '#5C4033' // Soil Brown
				},
				accent: {
					DEFAULT: '#E4B363', // Harvest Gold
					foreground: '#5C4033' // Soil Brown
				},
				agricultural: {
					'forest-green': '#2C6E49',
					'wheat-brown': '#C9B79C',
					'harvest-gold': '#E4B363',
					'soft-sand': '#F5F0EC',
					'soil-brown': '#5C4033',
					'stone-gray': '#A89F91',
					'crop-green': '#73A942',
					'drought-orange': '#D97D54'
				},
				destructive: {
					DEFAULT: '#D97D54', // Drought Orange
					foreground: '#F5F0EC'
				},
				muted: {
					DEFAULT: '#A89F91', // Stone Gray
					foreground: '#5C4033'
				},
				popover: {
					DEFAULT: '#F5F0EC',
					foreground: '#5C4033'
				},
				card: {
					DEFAULT: '#F5F0EC',
					foreground: '#5C4033'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			boxShadow: {
				'neo': '4px 4px 0px 0px rgba(0,0,0,1)'
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
}

