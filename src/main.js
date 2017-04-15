'use strict'

require('./main.css')

import Julia from './julia'

const canvas = document.getElementById('julia')
const julia = new Julia({canvas})
julia.render()
