/*
 * All runtime behaviour for the page, as one dependency-free classic script.
 * It is inlined into index.html at build time — the page ships zero
 * hydration and zero local JS requests. The only network dependency is
 * three.js for the hero lattice, which is loaded lazily and optionally.
 */
;(function () {
  var CONFIG = {
    motionLevel: 'noticeable', // 'subtle' | 'noticeable' | 'showpiece'
    confettiCount: 70,
    easterEggEnabled: true,
    loaderDelay: 900,
    threeUrl: 'https://esm.sh/three@0.160.0',
  }

  var LEVELS = {
    subtle: { d: 18, t: 420 },
    noticeable: { d: 34, t: 620 },
    showpiece: { d: 60, t: 900 },
  }
  var PALETTE = ['#F5B21A', '#F26B3A', '#2F6BDC', '#17A67A', '#7B4DDC', '#E8517F']
  var reduced =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  /* ---------- loader ---------- */
  function hideLoader() {
    var el = document.getElementById('loader')
    if (!el) return
    el.classList.add('loader--out')
    setTimeout(function () {
      el.hidden = true
    }, 450)
  }

  /* ---------- scroll reveals ---------- */
  function setupReveals() {
    var els = [].slice.call(document.querySelectorAll('[data-reveal]'))
    if (!els.length) return
    if (reduced || !('IntersectionObserver' in window)) return
    var lvl = LEVELS[CONFIG.motionLevel] || LEVELS.noticeable
    els.forEach(function (el) {
      el.style.opacity = '0'
      el.style.transform = 'translateY(' + lvl.d + 'px)'
      el.style.transition =
        'opacity ' +
        lvl.t +
        'ms cubic-bezier(.2,.8,.2,1), transform ' +
        lvl.t +
        'ms cubic-bezier(.2,.8,.2,1)'
    })
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return
          var i = parseInt(en.target.getAttribute('data-reveal'), 10) || 1
          en.target.style.transitionDelay = (i - 1) * 70 + 'ms'
          en.target.style.opacity = '1'
          en.target.style.transform = 'none'
          io.unobserve(en.target)
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.15 },
    )
    els.forEach(function (el) {
      io.observe(el)
    })
  }

  /* ---------- pointer tilt on cards ---------- */
  function setupTilt() {
    if (reduced) return
    document.querySelectorAll('[data-tilt]').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect()
        var x = (e.clientX - r.left) / r.width - 0.5
        var y = (e.clientY - r.top) / r.height - 0.5
        el.style.transform =
          'perspective(900px) rotateY(' +
          (x * 9).toFixed(2) +
          'deg) rotateX(' +
          (-y * 9).toFixed(2) +
          'deg) translateY(-6px)'
      })
      el.addEventListener('pointerleave', function () {
        el.style.transform = 'none'
      })
    })
  }

  /* ---------- timeline spine drawn on scroll ---------- */
  function setupTimeline() {
    var wrap = document.getElementById('timeline')
    var path = document.getElementById('timeline-progress')
    if (!wrap || !path || !path.getTotalLength) return
    var len = path.getTotalLength()
    path.style.strokeDasharray = len
    function draw() {
      var r = wrap.getBoundingClientRect()
      var start = innerHeight * 0.85
      var p = Math.max(0, Math.min(1, (start - r.top) / Math.max(1, r.height * 0.85)))
      path.style.strokeDashoffset = len * (1 - p)
    }
    draw()
    addEventListener('scroll', draw, { passive: true })
    addEventListener('resize', draw)
  }

  /* ---------- confetti ---------- */
  function confetti(n) {
    var host = document.getElementById('confetti')
    if (!host || reduced) return
    var count = n || CONFIG.confettiCount
    for (var i = 0; i < count; i++) {
      var s = document.createElement('span')
      var size = 8 + Math.random() * 12
      s.style.cssText =
        'position:absolute;top:-24px;left:' +
        Math.random() * 100 +
        '%;width:' +
        size +
        'px;height:' +
        size * (Math.random() > 0.5 ? 1 : 0.45) +
        'px;background:' +
        PALETTE[i % PALETTE.length] +
        ';border-radius:' +
        (Math.random() > 0.6 ? '50%' : '3px') +
        ';'
      s.style.setProperty('--dx', Math.random() * 260 - 130 + 'px')
      s.style.setProperty('--dr', Math.random() * 900 - 450 + 'deg')
      s.style.animation =
        'fall ' +
        (1500 + Math.random() * 1600) +
        'ms cubic-bezier(.25,.6,.4,1) ' +
        Math.random() * 260 +
        'ms forwards'
      host.appendChild(s)
      ;(function (node) {
        setTimeout(function () {
          node.remove()
        }, 3600)
      })(s)
    }
  }

  function setupConfettiTriggers() {
    document.querySelectorAll('[data-confetti]').forEach(function (el) {
      el.addEventListener('click', function () {
        confetti()
      })
    })
  }

  /* ---------- contact form → mailto ---------- */
  function setupForm() {
    var form = document.getElementById('contact-form')
    if (!form) return
    form.addEventListener('submit', function (e) {
      e.preventDefault()
      var to = form.getAttribute('data-mailto') || ''
      var name = form.name && form.name.value ? form.name.value : ''
      var email = form.email && form.email.value ? form.email.value : ''
      var msg = form.message && form.message.value ? form.message.value : ''
      var body = msg + '\n\n—\n' + name + '\n' + email
      location.href =
        'mailto:' +
        to +
        '?subject=' +
        encodeURIComponent('Portfolio enquiry from ' + name) +
        '&body=' +
        encodeURIComponent(body)
    })
  }

  /* ---------- easter egg: type the keyword ---------- */
  function setupEgg() {
    var egg = document.getElementById('egg')
    if (!egg || !CONFIG.easterEggEnabled) return
    var keyword = (egg.getAttribute('data-keyword') || 'golang').toLowerCase()
    var buf = ''
    egg.addEventListener('click', function () {
      egg.hidden = true
    })
    addEventListener('keydown', function (e) {
      if (!e.key || e.key.length !== 1) return
      var tag = (e.target && e.target.tagName) || ''
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      buf = (buf + e.key.toLowerCase()).slice(-(keyword.length + 2))
      if (buf.indexOf(keyword) === -1) return
      buf = ''
      egg.hidden = false
      confetti(140)
      var hero = document.querySelector('lattice-hero')
      if (hero && hero.wild) hero.wild()
    })
  }

  /* ---------- hero lattice (three.js, lazy + optional) ---------- */
  function defineLattice() {
    if (reduced || !('customElements' in window) || customElements.get('lattice-hero')) return

    var LatticeHero = function () {
      return Reflect.construct(HTMLElement, [], LatticeHero)
    }
    LatticeHero.prototype = Object.create(HTMLElement.prototype)
    Object.setPrototypeOf(LatticeHero, HTMLElement)

    LatticeHero.prototype.connectedCallback = function () {
      if (this._started) return
      this._started = true
      var host = this
      host.style.cssText = 'display:block;position:absolute;inset:0;pointer-events:none'
      import(CONFIG.threeUrl)
        .then(function (THREE) {
          host._boot(THREE)
        })
        .catch(function () {
          /* offline or blocked: the hero simply stays flat */
        })
    }

    LatticeHero.prototype._boot = function (THREE) {
      var host = this
      var PAL = [0xf5b21a, 0xf26b3a, 0x2f6bdc, 0x17a67a, 0x7b4ddc, 0xe8517f]
      var w = host.clientWidth || 800
      var h = host.clientHeight || 600

      var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
      renderer.setSize(w, h)
      renderer.domElement.style.cssText = 'width:100%;height:100%;display:block'
      host.appendChild(renderer.domElement)

      var scene = new THREE.Scene()
      var camera = new THREE.PerspectiveCamera(46, w / h, 0.1, 100)
      camera.position.set(0, 0, 15)
      var group = new THREE.Group()
      scene.add(group)

      // jittered 3D lattice of nodes
      var nodes = []
      var G = 3
      var SP = 3.4
      for (var x = 0; x < G; x++)
        for (var y = 0; y < G; y++)
          for (var z = 0; z < 3; z++)
            nodes.push(
              new THREE.Vector3(
                ((x - (G - 1) / 2) * SP + (Math.random() - 0.5) * 1.1),
                ((y - (G - 1) / 2) * SP + (Math.random() - 0.5) * 1.1),
                ((z - 1) * SP + (Math.random() - 0.5) * 1.1),
              ),
            )

      var nodeColors = nodes.map(function (_, i) {
        return new THREE.Color(PAL[i % PAL.length])
      })

      var nodeGeo = new THREE.SphereGeometry(0.19, 16, 16)
      nodes.forEach(function (p, i) {
        var m = new THREE.Mesh(nodeGeo, new THREE.MeshBasicMaterial({ color: nodeColors[i] }))
        m.position.copy(p)
        m.userData.base = p.clone()
        m.userData.phase = Math.random() * Math.PI * 2
        group.add(m)
      })

      // edges between near neighbours
      var edges = []
      for (var i = 0; i < nodes.length; i++)
        for (var j = i + 1; j < nodes.length; j++)
          if (nodes[i].distanceTo(nodes[j]) < SP * 1.25) edges.push([i, j])

      var lineGeo = new THREE.BufferGeometry()
      var lpos = new Float32Array(edges.length * 6)
      var lcol = new Float32Array(edges.length * 6)
      edges.forEach(function (e, k) {
        nodes[e[0]].toArray(lpos, k * 6)
        nodes[e[1]].toArray(lpos, k * 6 + 3)
        var ca = nodeColors[e[0]]
        var cb = nodeColors[e[1]]
        lcol.set([ca.r, ca.g, ca.b, cb.r, cb.g, cb.b], k * 6)
      })
      lineGeo.setAttribute('position', new THREE.BufferAttribute(lpos, 3))
      lineGeo.setAttribute('color', new THREE.BufferAttribute(lcol, 3))
      group.add(
        new THREE.LineSegments(
          lineGeo,
          new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.34 }),
        ),
      )

      // particles flowing along the edges — the "events"
      var COUNT = Math.min(edges.length * 2, 220)
      var flows = []
      for (var f = 0; f < COUNT; f++) {
        var e2 = edges[Math.floor(Math.random() * edges.length)]
        flows.push({
          a: e2[0],
          b: e2[1],
          t: Math.random(),
          sp: 0.1 + Math.random() * 0.22,
          c: nodeColors[e2[1]],
        })
      }
      var pGeo = new THREE.BufferGeometry()
      var ppos = new Float32Array(COUNT * 3)
      var pcol = new Float32Array(COUNT * 3)
      flows.forEach(function (fl, i2) {
        pcol.set([fl.c.r, fl.c.g, fl.c.b], i2 * 3)
      })
      pGeo.setAttribute('position', new THREE.BufferAttribute(ppos, 3))
      pGeo.setAttribute('color', new THREE.BufferAttribute(pcol, 3))
      var points = new THREE.Points(
        pGeo,
        new THREE.PointsMaterial({
          size: 0.34,
          vertexColors: true,
          transparent: true,
          opacity: 0.95,
          sizeAttenuation: true,
        }),
      )
      group.add(points)

      // cursor reactivity
      var target = { x: 0, y: 0 }
      var cur = { x: 0, y: 0 }
      host._onMove = function (ev) {
        target.x = (ev.clientX / innerWidth - 0.5) * 2
        target.y = (ev.clientY / innerHeight - 0.5) * 2
      }
      addEventListener('pointermove', host._onMove, { passive: true })

      if ('ResizeObserver' in window) {
        host._ro = new ResizeObserver(function () {
          var W = host.clientWidth || 1
          var H = host.clientHeight || 1
          renderer.setSize(W, H)
          camera.aspect = W / H
          camera.updateProjectionMatrix()
        })
        host._ro.observe(host)
      }

      var clock = new THREE.Clock()
      var moved = []
      function tick() {
        host._raf = requestAnimationFrame(tick)
        var t = clock.getElapsedTime()
        cur.x += (target.x - cur.x) * 0.045
        cur.y += (target.y - cur.y) * 0.045
        group.rotation.y = t * 0.11 + cur.x * 0.55
        group.rotation.x = Math.sin(t * 0.16) * 0.12 + cur.y * 0.35

        var mi = 0
        group.children.forEach(function (c) {
          if (!c.userData.base) return
          var b = c.userData.base
          c.position.set(
            b.x + Math.sin(t * 0.7 + c.userData.phase) * 0.16,
            b.y + Math.cos(t * 0.6 + c.userData.phase) * 0.16,
            b.z + Math.sin(t * 0.5 + c.userData.phase) * 0.16,
          )
          moved[mi++] = c.position
        })
        edges.forEach(function (ed, k) {
          moved[ed[0]].toArray(lpos, k * 6)
          moved[ed[1]].toArray(lpos, k * 6 + 3)
        })
        lineGeo.attributes.position.needsUpdate = true

        flows.forEach(function (fl, i3) {
          fl.t += fl.sp * 0.048
          if (fl.t > 1) {
            fl.t = 0
            var ne = edges[Math.floor(Math.random() * edges.length)]
            fl.a = ne[0]
            fl.b = ne[1]
            var c2 = nodeColors[fl.b]
            pcol.set([c2.r, c2.g, c2.b], i3 * 3)
            pGeo.attributes.color.needsUpdate = true
          }
          var A = moved[fl.a]
          var B = moved[fl.b]
          ppos[i3 * 3] = A.x + (B.x - A.x) * fl.t
          ppos[i3 * 3 + 1] = A.y + (B.y - A.y) * fl.t
          ppos[i3 * 3 + 2] = A.z + (B.z - A.z) * fl.t
        })
        pGeo.attributes.position.needsUpdate = true

        renderer.render(scene, camera)
      }
      tick()

      // called by the easter egg
      host.wild = function () {
        flows.forEach(function (fl) {
          fl.sp *= 3.2
        })
        points.material.size = 0.6
        setTimeout(function () {
          flows.forEach(function (fl) {
            fl.sp /= 3.2
          })
          points.material.size = 0.34
        }, 6000)
      }
    }

    LatticeHero.prototype.disconnectedCallback = function () {
      cancelAnimationFrame(this._raf)
      if (this._ro) this._ro.disconnect()
      if (this._onMove) removeEventListener('pointermove', this._onMove)
    }

    customElements.define('lattice-hero', LatticeHero)
  }

  function boot() {
    setupReveals()
    setupTilt()
    setupTimeline()
    setupConfettiTriggers()
    setupForm()
    setupEgg()
    defineLattice()
    setTimeout(hideLoader, CONFIG.loaderDelay)
    if (!window.__budiHi) {
      window.__budiHi = true
      console.log(
        '%cLooking under the hood? Respect. Type "golang" anywhere.',
        'color:#F5B21A;font-weight:bold',
      )
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot)
  } else {
    boot()
  }
})()
