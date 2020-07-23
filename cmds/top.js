﻿const map = (u,x,p) => `${p+1}. ${(u||{}).tag||'unknown#0000'}${Comp.owners.get(x.id)?Comp.getEmoji('crown'):''} - ${Comp.getLvl(x.profile.xp)} lvl ${Comp.getRxp(x.profile.xp)}/${Comp.getLvlXp(x.profile.xp)} xp`,
pl = 15,
m = ['wait', 'unknown', 'copper']
module.exports = {
info: {
name: 'топ',
engname: 'top',
desc: `отображает топ ${pl} пользователей`,
engdesc: `shows top ${pl} of users`,
regex: 'то[пб]',
engregex: 'to[pb]',
},
run: message =>
Comp.DB.get('User').find({}).then(async i=> {
i = i
.sort((a,b)=>b.profile.xp-a.profile.xp)
.filter((x,p)=>x.profile.xp>0&&(p+1)<=pl)
i = await Promise.all(i.map((x, p) =>
Comp.client.users.fetch(x.id)
.then(u=>x=map(u,x,p), e=>x=map({},x,p))
))
for(let x=0;x<m.length;x++)
i[x] = Comp.getEmoji(m[x]) + i[x].slice(2)
message.channel.send(
new Comp.Embed()
.setColor(Comp.beta?'BLURPLE':'00fff0')
.addField('TOP '+pl, i)
)
.catch(e =>message.channel.send(new Comp.Embed().setColor('ff0055').setTitle('ERROR').setDescription(e)))
})
.catch(e =>message.channel.send(new Comp.Embed().setColor('ff0055').setTitle('ERROR').setDescription(e)))
}