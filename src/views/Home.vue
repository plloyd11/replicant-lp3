<template>
  <div class="flex flex-col w-full h-screen overflow-hidden bg-gray-100" id="demo_wrap">
    <div
      class="relative z-10 flex flex-col w-full h-full mx-auto space-y-4 md:space-y-0 md:justify-center md:flex-row"
    >
      <div class="flex flex-col w-full bg-gray-100 rounded-lg md:w-5/12">
        <div class="w-4/5 m-auto mt-4 mb-0">
          <div v-for="(audio, indexo) in audios.slice(index, index + 1)" :key="indexo" class="mb-4">
            <h3 class="text-3xl text-gray-900">{{ audio.name }}</h3>
            <p class="mt-1 text-lg text-grey">{{ audio.artist }}</p>
          </div>
          <div class="relative m-auto">
            <img
              class="block w-full h-full m-auto"
              src="@/assets/img/cover.jpg"
              alt="Malignant Reality Cover"
            />
          </div>
        </div>
        <div class="flex items-center justify-between w-4/5 m-auto mt-8 mb-4">
          <div class="p-1 rounded-full text-grey-darker hover:bg-gray-300">
            <svg
              @click="random = !random"
              :class="random ? 'text-red-500' : ''"
              class="w-8 h-8 cursor-pointer"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M6.59 12.83L4.4 15c-.58.58-1.59 1-2.4 1H0v-2h2c.29 0 .8-.2 1-.41l2.17-2.18 1.42 1.42zM16 4V1l4 4-4 4V6h-2c-.29 0-.8.2-1 .41l-2.17 2.18L9.4 7.17 11.6 5c.58-.58 1.59-1 2.41-1h2zm0 10v-3l4 4-4 4v-3h-2c-.82 0-1.83-.42-2.41-1l-8.6-8.59C2.8 6.21 2.3 6 2 6H0V4h2c.82 0 1.83.42 2.41 1l8.6 8.59c.2.2.7.41.99.41h2z"
              />
            </svg>
          </div>
          <div class="p-1 rounded-full text-grey-darker hover:bg-gray-300">
            <svg
              @click="prevButton ? previous() : ''"
              class="w-8 h-8 cursor-pointer"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M4 5h3v10H4V5zm12 0v10l-9-5 9-5z" />
            </svg>
          </div>
          <div class="p-4 text-white rounded-full shadow-lg bg-xiketic">
            <svg
              v-if="!pauseTrack"
              @click="play()"
              class="w-8 h-8 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <svg
              v-else
              @click="pause()"
              class="w-8 h-8 cursor-pointer"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
            </svg>
          </div>
          <div class="p-1 rounded-full text-grey-darker hover:bg-gray-300">
            <svg
              @click="nextButton ? next() : ''"
              class="w-8 h-8 cursor-pointer"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M13 5h3v10h-3V5zM4 5l9 5-9 5V5z" />
            </svg>
          </div>
          <div class="p-1 rounded-full text-grey-darker hover:bg-gray-300">
            <svg
              @click="repeat = !repeat"
              :class="repeat ? 'text-red-500' : ''"
              class="w-8 h-8 cursor-pointer"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M5 4a2 2 0 0 0-2 2v6H0l4 4 4-4H5V6h7l2-2H5zm10 4h-3l4-4 4 4h-3v6a2 2 0 0 1-2 2H6l2-2h7V8z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="md:w-7/12">
        <ul
          class="w-full pt-2 m-auto mb-2 overflow-auto bg-gray-100"
          style="max-height:100%"
          id="journal-scroll"
        >
          <li
            @click="selectSound(indexo)"
            :style="indexo == index ? '' : ''"
            :class="indexo == index ? 'bg-gradient-to-r from-charcoal to-steelBlue text-white' : ''"
            class="flex w-11/12 px-1 py-1 m-auto rounded cursor-pointer"
            v-for="(audio, indexo) in audios"
            :key="indexo"
          >
            <div class="w-1/5 m-auto">
              {{ indexo + 1 }}
            </div>
            <div class="w-3/5 m-auto text-left">
              <div class="text-xl">
                <p>{{ audio.name }}</p>
                <p class="text-xs text-gray-500">{{ audio.artist }}</p>
              </div>
            </div>
            <div class="w-1/5 m-auto">
              <svg
                v-if="state.audioPlaying[indexo]"
                class="w-6 h-6 m-auto"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
              </svg>
              <svg
                v-else
                class="w-6 h-6 m-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="relative z-10 w-full bg-gray-200">
      <div class="flex items-center justify-around w-11/12 h-16 m-auto">
        <div
          class="items-center hidden w-2/12 md:flex"
          v-for="(audio, indexo) in audios.slice(index, index + 1)"
          :key="indexo"
        >
          <img class="w-10 h-10 rounded-full" src="@/assets/img/replicant.jpg" />
          <div class="flex flex-col ml-2">
            <p>{{ audio.name }}</p>
            <p class="text-xs text-gray-600">{{ audio.artist }}</p>
          </div>
        </div>
        <div class="flex items-center w-4/5 md:w-8/12">
          <div class="w-2/12 text-sm text-grey-darker md:w-1/12">
            <p>{{ timer }}</p>
          </div>
          <div class="relative w-8/12 mt-1 md:w-10/12">
            <div
              @click="seek($event)"
              ref="progress"
              class="h-1 bg-gray-500 rounded-full cursor-pointer bg-grey-dark"
            >
              <div
                class="relative flex justify-end w-full h-1 rounded-full bg-gradient-to-r from-charcoal to-steelBlue"
                :style="{ width: step + '%' }"
              ></div>
            </div>
            <div
              class="relative flex justify-end w-full h-1 rounded-full"
              :style="{ width: step + '%' }"
            >
              <span
                id="progressButtonTimer"
                class="absolute w-3 h-3 -mb-1 rounded-full shadow md:w-4 md:h-4 bg-gradient-to-r from-charcoal to-steelBlue pin-r pin-b"
              ></span>
            </div>
          </div>
          <div class="w-2/12 text-sm text-grey-darker md:w-1/12">
            <p class="pl-2">{{ duration }}</p>
          </div>
        </div>
        <div class="flex items-center w-1/5 m-auto md:w-2/12">
          <div class="w-3/12 rounded-full md:w-2/12 hover:bg-gray-500 md:p-1" @click="mute()">
            <svg
              v-if="mutePlayer"
              class="w-6 h-6 m-auto text-red-500 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                clip-rule="evenodd"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              />
            </svg>
            <svg
              v-else
              class="w-6 h-6 m-auto cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
            </svg>
          </div>
          <div class="relative w-9/12 m-auto md:w-10/12">
            <div
              @click="volume($event)"
              ref="volBar"
              class="relative h-1 m-auto bg-gray-500 rounded-full cursor-pointer bg-grey-dark"
              style="width:100%"
            >
              <div
                class="relative flex justify-end h-1 rounded-full bg-gradient-to-r from-charcoal to-steelBlue"
                :style="{ width: volumeProgress + '%' }"
              ></div>
            </div>
            <div
              class="relative flex justify-end h-1 rounded-full"
              :style="{ width: volumeProgress + '%' }"
            >
              <span
                id="progressButtonVolume"
                class="absolute w-3 h-3 -mb-1 rounded-full shadow md:w-4 md:h-4 bg-gradient-to-r from-charcoal to-steelBlue pin-r pin-b"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import caverns from '@/music/caverns.wav'
import relinquish from '@/music/relinquish.wav'
import ektoskull from '@/music/ektoskull.wav'
import deathcurse from '@/music/deathcurse.wav'
import coerced from '@/music/coerced.wav'
import rabid from '@/music/rabid.wav'
import chassis from '@/music/chassis.wav'
import dressed from '@/music/dressed.wav'
import excess from '@/music/excess.wav'
import ubiquity from '@/music/ubiquity.wav'

import { Howl, Howler } from 'howler'

export default {
  mounted() {
    let sound = this.audios[this.index].howl

    let barWidth = (0.9 * 100) / 100
    this.sliderBtnVol = this.volBar.offsetWidth * barWidth + this.volBar.offsetWidth * 0.05 - 25
  },

  setup() {
    const audios = ref([
      { name: 'Caverns Of Insipid Reflection', file: caverns, artist: 'Replicant', howl: null },
      { name: 'Relinquish The Self', file: relinquish, artist: 'Replicant', howl: null },
      { name: 'Ektoskull', file: ektoskull, artist: 'Replicant', howl: null },
      { name: 'Death Curse', file: deathcurse, artist: 'Replicant', howl: null },
      { name: 'Coerced To Be', file: coerced, artist: 'Replicant', howl: null },
      { name: 'Rabid Future', file: rabid, artist: 'Replicant', howl: null },
      { name: 'Chassis Of Deceit', file: chassis, artist: 'Replicant', howl: null },
      { name: 'Dressed In Violence', file: dressed, artist: 'Replicant', howl: null },
      { name: 'Excess Womb', file: excess, artist: 'Replicant', howl: null },
      { name: 'The Ubiquity Of Time', file: ubiquity, artist: 'Replicant', howl: null }
    ])
    const step = ref(0)
    const nextButton = ref(true)
    const prevButton = ref(true)
    const random = ref(false)
    const repeat = ref(false)
    const index = ref(0)
    const duration = ref('00:00')
    const timer = ref('00:00')
    const pauseTrack = ref(false)
    const progress = ref(null)
    const volBar = ref(null)
    const sliderBtn = ref(0)
    const sliderBtnVol = ref(null)
    const volumeProgress = ref(90)
    const mutePlayer = ref(false)
    const state = reactive({
      audioPlaying: []
    })
    function formatTime(secs) {
      var minutes = Math.floor(secs / 60) || 0
      var seconds = Math.floor(secs - minutes * 60) || 0

      return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds
    }
    function play() {
      var sound

      var audio = audios.value[index.value]
      if (audio.howl) {
        sound = audio.howl
      } else {
        state.audioPlaying[index.value] = false
        sound = audio.howl = new Howl({
          src: [audio.file],
          html5: true, // A live stream can only be played through HTML5 Audio.
          format: ['wav', 'aac'],
          onplay: function() {
            pauseTrack.value = true
            nextButton.value = true
            prevButton.value = true
            duration.value = formatTime(sound.duration())
            requestAnimationFrame(stepFunction.bind(this))
          },
          onpause: function() {
            pauseTrack.value = false
          },
          onend: function() {
            next()
          },
          onseek: function() {
            window.requestAnimationFrame(stepFunction.bind(this))
          }
        })
      }

      sound.play()

      state.audioPlaying[index.value] = true
    }
    function pause(indexo) {
      var audio = audios.value[index.value].howl

      if (audio) {
        audio.pause()
        pauseTrack.value = false
        state.audioPlaying[index.value] = false
      }
    }

    function stepFunction() {
      let sound = audios.value[index.value].howl
      let seek = sound.seek()
      timer.value = formatTime(Math.round(seek))
      step.value = (seek * 100) / sound.duration()

      sliderBtn.value =
        progress.value.offsetWidth * (step.value / 100) + progress.value.offsetWidth * 0.05 - 25

      if (sound.playing()) {
        window.requestAnimationFrame(stepFunction.bind(this))
      }
    }

    function seek(event) {
      var per = event.offsetX / progress.value.clientWidth

      var sound = audios.value[index.value].howl

      if (sound) {
        if (sound.playing()) {
          sound.pause()
          sound.seek(sound.duration() * per)
          var barWidth = (per * 100) / 100
          sliderBtn.value =
            progress.value.offsetWidth * barWidth + progress.value.offsetWidth * 0.05 - 25
          sound.play()
        } else {
          sound.seek(sound.duration() * per)
          var barWidth = (per * 100) / 100
          sliderBtn.value =
            progress.value.offsetWidth * barWidth + progress.value.offsetWidth * 0.05 - 25
        }
      }
    }

    function next() {
      nextButton.value = false
      var audio = audios.value[index.value].howl

      state.audioPlaying[index.value] = false

      mutePlayer.value ? (mutePlayer.value = false) : ''
      audio && audio.mute(true) ? audio.mute(false) : ''

      if (audio && audios.value.length - 1 == index.value) {
        audio.stop()

        repeat.value
          ? (index.value = index.value)
          : random.value
          ? (index.value = Math.floor(Math.random() * audios.value.length))
          : (index.value = 0)
      } else {
        if (audio) {
          audio.stop()
        }

        repeat.value
          ? (index.value = index.value)
          : random.value
          ? (index.value = Math.floor(Math.random() * audios.value.length))
          : index.value++
      }

      play()
    }

    function previous() {
      var audio = audios.value[index.value].howl
      prevButton.value = false
      state.audioPlaying[index.value] = false

      mutePlayer.value ? (mutePlayer.value = false) : ''
      audio && audio.mute(true) ? audio.mute(false) : ''

      if (!audio) {
        index.value = audios.value.length - 1
      } else if (audio && index.value == 0) {
        audio.stop()

        repeat.value
          ? (index.value = index.value)
          : random.value
          ? (index.value = Math.floor(Math.random() * audios.value.length))
          : (index.value = audios.value.length - 1)
      } else if (audio) {
        audio.stop()

        repeat.value
          ? (index.value = index.value)
          : random.value
          ? (index.value = Math.floor(Math.random() * audios.value.length))
          : index.value--
      }

      play()
    }
    function selectSound(indexSelected) {
      var audio = audios.value[index.value].howl

      if (audio) {
        audio.stop()
        state.audioPlaying[index.value] = false
      }

      index.value = indexSelected

      play()
    }

    function volume(event) {
      let per = event.layerX / parseFloat(volBar.value.scrollWidth)
      let barWidth = (per * 100) / 100
      volumeProgress.value = barWidth * 100
      sliderBtnVol.value =
        volBar.value.offsetWidth * barWidth + volBar.value.offsetWidth * 0.05 - 25
      Howler.volume(per)
    }

    function mute() {
      let audio = audios.value[index.value].howl

      if (audio) {
        mutePlayer.value = !mutePlayer.value

        mutePlayer.value ? audio.mute(true) : audio.mute(false)
      }
    }

    return {
      play,
      pause,
      duration,
      formatTime,
      audios,
      pauseTrack,
      next,
      previous,
      index,
      timer,
      step,
      stepFunction,
      seek,
      selectSound,
      state,
      random,
      repeat,
      progress,
      volume,
      volBar,
      volumeProgress,
      sliderBtn,
      mute,
      mutePlayer,
      sliderBtnVol,
      nextButton,
      prevButton
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Audiowide&display=swap');
* {
  font-family: 'Audiowide', cursive;
}
#journal-scroll::-webkit-scrollbar {
  width: 4px;
  cursor: pointer;
}
#journal-scroll::-webkit-scrollbar-track {
  background-color: rgba(229, 231, 235, var(--bg-opacity));
  cursor: pointer;
}
#journal-scroll::-webkit-scrollbar-thumb {
  cursor: pointer;
  background-color: #a0aec0;
}

#progressButtonTimer,
#progressButtonVolume {
  margin-top: -9px;
  right: -8px;
}

@media screen and (max-width: 768px) {
  #progressButtonTimer,
  #progressButtonVolume {
    margin-top: -8px;
    right: -7px;
  }
}
</style>
