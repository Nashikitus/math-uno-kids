'use client'

import { useState } from 'react'
import { Ellipsis, Heart, Share2, ThumbsDown, ThumbsUp } from 'lucide-react'
import { VturbPlayer } from '@/components/vturb-player'

const comments = [
  { name: 'Letícia Almeida', time: 'há 1 hora', text: 'Eu não fazia ideia de que dava para viajar sem pagar e ainda transformar isso em renda. Esse passo a passo abriu minha mente.', likes: 13, reply: false },
  { name: 'Marcos Vinícius', time: 'há 1 hora', text: 'A parte de ganhar dinheiro com as próprias experiências fez muito sentido. Vou começar a aplicar hoje.', likes: 15, reply: false },
  { name: 'Camila Ferreira', time: 'há 1 hora', text: 'Vídeo direto ao ponto. A narração e os exemplos deixaram o método muito fácil de entender.', likes: 8, reply: false },
  { name: 'Rafael Santos', time: 'há 2 horas', text: 'Finalmente alguém explicou como transformar viagem em oportunidade de verdade.', likes: 6, reply: false },
]

function Avatar({ name, channel = false }: { name: string; channel?: boolean }) {
  return <span className={channel ? 'channel-avatar' : 'avatar'} aria-hidden="true">{name.charAt(0)}</span>
}

function Comment({ name, time, text, likes }: (typeof comments)[number]) {
  const [liked, setLiked] = useState(false)
  return (
    <article className="comment">
      <Avatar name={name} />
      <div className="comment-body">
        <div className="comment-meta"><strong>{name}</strong><span>·</span><span>{time}</span></div>
        <p>{text}</p>
        <div className="comment-actions">
          <button type="button" className={liked ? 'comment-action active' : 'comment-action'} onClick={() => setLiked(!liked)} aria-pressed={liked} aria-label="Curtir comentário"><ThumbsUp className="comment-icon" aria-hidden="true" fill={liked ? 'currentColor' : 'none'} /><span>{likes + (liked ? 1 : 0)}</span></button>
          <button type="button" className="comment-action" aria-label="Descurtir comentário"><ThumbsDown className="comment-icon" aria-hidden="true" /></button>
          <button type="button" className="comment-action reply-action" aria-label="Responder comentário">Responder</button>
        </div>
      </div>
    </article>
  )
}

export default function Page() {
  const [subscribed, setSubscribed] = useState(false)
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [shared, setShared] = useState(false)

  function shareVideo() {
    setShared(true)
    if (navigator.share) navigator.share({ title: 'Como viajar de graça e ainda ganhar dinheiro - Passo a passo', url: window.location.href }).catch(() => {})
  }

  async function startCheckout() {
    const tracking = Object.fromEntries(new URLSearchParams(window.location.search).entries())
    const response = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tracking }) })
    const data = await response.json()
    if (response.ok && data.url) window.location.assign(data.url)
  }

  return (
    <main className="page-shell">
      <div className="video-page">
        <section className="player-section" aria-label="Player do vídeo"><VturbPlayer /></section>
        <div className="utmify">
          <button type="button" onClick={startCheckout}>QUERO ACESSAR - O CHECK IN REVERSO</button>
          <p>Acesso imediato • R$37 • 7 dias de garantia.</p>
        </div>

        <section className="video-info">
          <h1>Como viajar de graça e ainda ganhar dinheiro - Passo a passo</h1>
          <div className="video-stats">Conteúdo exclusivo <span>•</span> 498 mil visualizações <span>•</span> há 9 horas</div>
          <div className="channel-row">
            <Avatar name="C" channel />
            <button type="button" className={subscribed ? 'subscribe subscribed' : 'subscribe'} onClick={() => setSubscribed(!subscribed)}>{subscribed ? 'Inscrito' : 'Inscrever-se'}</button>
          </div>
          <div className="action-row">
            <div className="action-group"><button type="button" className={liked ? 'action-pill active' : 'action-pill'} onClick={() => { setLiked(!liked); setDisliked(false) }} aria-pressed={liked} aria-label="Curtir"><Heart className="action-icon" fill={liked ? 'currentColor' : 'none'} /> <span>{liked ? '4,8 mil' : '4,7 mil'}</span></button><button type="button" className={disliked ? 'action-pill active action-dislike' : 'action-pill action-dislike'} onClick={() => { setDisliked(!disliked); setLiked(false) }} aria-pressed={disliked} aria-label="Descurtir"><ThumbsDown className="action-icon" /></button></div>
            <button type="button" className={shared ? 'action-pill active' : 'action-pill'} onClick={shareVideo} aria-pressed={shared}><Share2 className="action-icon" /> <span>{shared ? 'Compartilhado' : 'Compartilhar'}</span></button>
            <button type="button" className={saved ? 'action-pill active' : 'action-pill'} onClick={() => setSaved(!saved)} aria-pressed={saved}><span className="save-icon" aria-hidden="true">▱</span> <span>{saved ? 'Salvo' : 'Salvar'}</span></button>
            <button type="button" className="more-button" aria-label="Mais ações"><Ellipsis className="action-icon" /></button>
          </div>
        </section>

        <section id="comentarios" className="comments-section">
          <div className="comments-heading"><h2>Comentários <span>3</span></h2><span className="comment-menu" aria-hidden="true">● •</span></div>
          <div className="featured-comment">
            {comments.slice(0, 3).map((comment) => (
              <Comment key={comment.name} {...comment} />
            ))}
          </div>
        </section>
        <footer><p>Copyright 2026 - Todos os direitos reservados.</p><div><a href="#termos">Termos de Uso</a><a href="#privacidade">Política de Privacidade</a></div></footer>
      </div>
    </main>
  )
}
