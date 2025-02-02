/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
			animation: {
				move: "move linear infinite",
				moveRandom: "moveRandom 5s linear infinite",
			},
			keyframes: {
				move: {
          "0%": { transform: "translateY(-40%)" },
          "100%": { transform: "translateY(140vh)" },
        },
				moveRandom: {
          "0%": {
            transform: "translate(0, 0)",
          },
          "25%": {
            transform: "translate(-50px, 100px)",
          },
          "50%": {
            transform: "translate(50px, -100px)",
          },
          "75%": {
            transform: "translate(-100px, -50px)",
          },
          "100%": {
            transform: "translate(0, 200px)",
          },
				},
			},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
				'text-1': '187 100% 10.6%',
				'text-2': '24 100% 15.6%',
				'blizzard-blue': {
          '50': '#ebfeff',
          '100': '#cdf8ff',
          '200': '#99eeff',
          '300': '#62e2fe',
          '400': '#1bcaf5',
          '500': '#00addb',
          '600': '#0289b8',
          '700': '#0a6e94',
          '800': '#125a78',
          '900': '#134a66',
          '950': '#063046',
        },
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

