/* ui/player.jsx: the custom-controlled <video>/<audio> player (play/pause, seek bar, time).
   The controls are wired by init_player() (actions) through data-mp, data-act="mp_play", data-mp-seek and data-mp-time. */
import { ic } from '../icons/index.js';

export const player = (kind, src, poster = '') => (
  <div className="mp card overflow-hidden" data-mp="">
    {kind === 'video'
      ? <div className="relative bg-ink">
          <video preload="metadata" playsInline poster={poster} className="block aspect-video w-full object-cover">
            <source src={src} type="video/mp4" /><track kind="captions" srcLang="la" label="Latina" default data-vtt="" />
          </video>
          <button className="mp_big absolute inset-0 m-auto grid h-16 w-16 place-items-center rounded-full bg-brand text-white transition hover:scale-105" data-act="mp_play" aria-label="Play video">{ic('play', 'w-7 h-7')}</button>
        </div>
      : <audio preload="metadata"><source src={src} type="audio/mpeg" /></audio>}
    <div className="flex items-center gap-3 p-3">
      <button className="icon_btn bg-brand/10 text-accent hover:bg-brand hover:text-white" data-act="mp_play" aria-label="Play or pause">
