import{d as f,a as u,r as p,f as o,i,F as b,g as $,t as h,u as T,p as M,q as x,o as m,c as j}from"./index-_LhuCKND.js";/* empty css                */const c={images:{team:"src/assets/images/team"}},k=[{name:"张教授",title:"首席科学家",avatar:`${c.images.team}/member/zxs.jpg`,description:"在食品科学领域拥有20年研究经验，主持多项国家级研究项目。",achievements:[{title:"国家科技进步奖",description:"因在食品加工技术领域的突出贡献获得表彰"},{title:"发明专利",description:"拥有15项发明专利"}],publications:["《功能性食品开发与应用》","《现代食品加工工艺》"]},{name:"李博士",title:"技术总监",avatar:`${c.images.team}/member/zxs.jpg`,description:"专注于食品工程和营养学研究，负责产品配方开发。",achievements:[{title:"技术创新奖",description:"开发新型食品加工工艺"}]},{name:"王工程师",title:"生产主管",avatar:`${c.images.team}/member/zxs.jpg`,description:"拥有10年食品生产管理经验，确保产品质量稳定。"}],S=f("teamStore",{state:()=>({team:k}),getters:{getAllTeamMembers:e=>e.team,getTeamMemberByName:e=>a=>e.team.find(s=>s.name===a),getTeamMembersByTitle:e=>a=>e.team.filter(s=>s.title===a)},actions:{addTeamMember(e){if(!e.name||!e.title||!e.avatar||!e.description){console.error("添加团队成员时，姓名、职位、头像和描述为必填项。");return}this.team.push(e)},removeTeamMember(e){const a=this.team.findIndex(s=>s.name===e);if(a===-1){console.error(`未找到姓名为 ${e} 的团队成员，无法删除。`);return}this.team.splice(a,1)},updateTeamMember(e){const a=this.team.findIndex(s=>s.name===e.name);if(a===-1){console.error(`未找到姓名为 ${e.name} 的团队成员，无法更新。`);return}this.team[a]={...this.team[a],...e}}}}),B={class:"team-grid"},C=["onClick"],y={class:"team-card-image"},z=["src","alt"],A={class:"team-card-content"},D={class:"team-card-name"},H={class:"team-card-title"},I=["innerHTML"],L=u({__name:"Team",setup(e){const s=S().getAllTeamMembers,r=p(!1),l=p(""),_=d=>{const t=s[d];t&&(l.value=`
      <div class="member-modal-content">
        <div class="member-modal-image">
          <img src="${t.avatar||"./assets/images/placeholder.jpg"}" alt="${t.name}" @error="handleImageError($event)">
        </div>
        <div class="member-modal-info">
          <h2 class="member-modal-title">${t.name}</h2>
          <p class="member-modal-position">${t.title}</p>
          <div class="member-modal-description">
            ${t.description||""}
          </div>
          ${t.achievements?`
            <div class="member-achievements">
              <h3>主要成就</h3>
              <div class="member-achievements-list">
                ${t.achievements.map(n=>`
                  <div class="achievement-card">
                    <h4>${n.title}</h4>
                    <p>${n.description}</p>
                  </div>
                `).join("")}
              </div>
            </div>
          `:""}
          ${t.publications?`
            <div class="member-publications">
              <h3>研究成果</h3>
              <div class="publication-list">
                ${t.publications.map(n=>`
                  <div class="publication-item">
                    <i class="fas fa-file-alt"></i>
                    <span>${n}</span>
                  </div>
                `).join("")}
              </div>
            </div>
          `:""}
        </div>
      </div>
    `,r.value=!0)},g=()=>{r.value=!1};return(d,t)=>(m(),o("div",null,[t[0]||(t[0]=i("div",{class:"content-header"},[i("h2",{class:"section-title"},"团队成员"),i("p",{class:"section-subtitle"},"权威机构认证，品质有保障")],-1)),i("div",B,[(m(!0),o(b,null,$(T(s),(n,v)=>(m(),o("div",{key:v,class:"team-card",onClick:w=>_(v)},[i("div",y,[i("img",{src:n.avatar||"./assets/images/placeholder.jpg",alt:n.name},null,8,z)]),i("div",A,[i("h3",D,h(n.name),1),i("p",H,h(n.title),1)])],8,C))),128))]),i("div",{class:x(["member-modal",{active:r.value}]),onClick:M(g,["self"])},[i("div",{innerHTML:l.value},null,8,I)],2)]))}}),N=u({__name:"index",setup(e){return(a,s)=>(m(),j(L))}});export{N as default};
