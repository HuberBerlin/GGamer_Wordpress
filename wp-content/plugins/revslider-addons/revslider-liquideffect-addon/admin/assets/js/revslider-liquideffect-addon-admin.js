!function(t){var e={},a="revslider-liquideffect-addon",i=revslider_liquideffect_addon.bricks;function s(t){return void 0===t||void 0===t.map?{enable:!1,useBGsettings:!1,use:"default",map:{image:"Ripple",custom:"",size:"Large",imagescale:120},animation:{enable:!0,speedx:2,speedy:20,rotation:0,rotationx:20,rotationy:0,scalex:20,scaley:20},transition:{enable:!0,cross:!0,duration:1e3,easing:"Power3.easeOut",speedx:2,speedy:100,rotation:0,rotationx:20,rotationy:0,scalex:2,scaley:1280,power:!1},interaction:{enable:!1,event:"mousemove",duration:500,easing:"Power2.easeOut",speedx:0,speedy:0,rotation:0,scalex:2,scaley:1280,disablemobile:!1}}:jQuery.extend(!0,{map:{imagescale:120}},t)}function n(){var t,e=RVS.S.slideId.toString(),i=-1!==e.search("static"),s=RVS.SLIDER[e].slide.addOns[a].enable;return!i&&(!0===(t=s)||"true"===t||"on"===t)}function o(t){t?document.body.classList.add("liquid-effect-active"):document.body.classList.remove("liquid-effect-active")}RVS.DOC.on(a+"_init",(function(){e.isActive=RVS.SLIDER.settings.addOns[a].enable,e.isActive&&function(){var t=RVS.SLIDER.slideIDs;for(var e in t)if(t.hasOwnProperty(e)){var i=t[e];-1===i.toString().search("static")&&(RVS.SLIDER[i].slide.addOns[a]=s(RVS.SLIDER[i].slide.addOns[a]))}}();var d,r,c=!e.initialised;c&&e.isActive?(RVS.F.addOnContainer.create({slug:a,icon:"fingerprint",title:i.distortion,alias:i.distortion,slide:!0}),e.forms={slidegeneral:t("#form_slidegeneral_"+a)},e.defaults={clouds_small:{title:"Clouds Small",preset:{enable:!0,map:{image:"Clouds",size:"Small",custom:""},animation:{enable:!0,speedx:2,speedy:2,rotationx:0,rotationy:0,rotation:0,scalex:5,scaley:5},transition:{enable:!0,cross:!1,duration:1e3,easing:"Power3.easeOut",speedx:0,speedy:0,rotationx:0,rotationy:0,rotation:0,scalex:200,scaley:200,power:!1},interaction:{enable:!0,event:"mousedown",duration:500,easing:"Power2.easeOut",speedx:-2,speedy:-2,scalex:600,scaley:300,rotation:0,disablemobile:!0}}},clouds_large:{title:"Clouds Large",preset:{enable:!0,map:{image:"Clouds",size:"Large",custom:""},animation:{enable:!0,speedx:10,speedy:3,rotationx:0,rotationy:0,rotation:0,scalex:20,scaley:20},transition:{enable:!0,cross:!1,duration:2e3,easing:"Power3.easeOut",speedx:10,speedy:3,rotationx:0,rotationy:0,rotation:0,scalex:5,scaley:5,power:!1},interaction:{enable:!1,event:"mousemove",duration:500,easing:"Power2.easeOut",speedx:0,speedy:0,scalex:2,scaley:1280,rotation:0,disablemobile:!1}}},ripple_large:{title:"Ripple Large",preset:{enable:!0,map:{image:"Ripple",size:"Large",custom:""},animation:{enable:!0,speedx:2,speedy:20,rotationx:20,rotationy:0,rotation:0,scalex:20,scaley:20},transition:{enable:!0,cross:!0,duration:2e3,easing:"Power3.easeOut",speedx:2,speedy:100,rotationx:20,rotationy:0,rotation:0,scalex:200,scaley:2e3,power:!1},interaction:{enable:!0,event:"mousemove",duration:500,easing:"Power2.easeOut",speedx:0,speedy:0,scalex:200,scaley:200,rotation:0,disablemobile:!0}}},crystalize_small:{title:"Crystalize Small",preset:{enable:!0,map:{image:"Crystalize",size:"Small",custom:""},animation:{enable:!1,speedx:0,speedy:0,rotationx:0,rotationy:0,rotation:0,scalex:0,scaley:0},transition:{enable:!0,cross:!0,duration:1e3,easing:"Power4.easeOut",speedx:1e3,speedy:1e3,rotationx:0,rotationy:0,rotation:0,scalex:300,scaley:300,power:!0},interaction:{enable:!1,event:"mousedown",duration:1e3,easing:"Linear.easeNone",speedx:0,speedy:0,scalex:1200,scaley:200,rotation:0,disablemobile:!1}}},swirl_large:{title:"Swirl Large",preset:{enable:!0,map:{image:"Swirl",size:"Large",custom:""},animation:{enable:!0,speedx:0,speedy:0,rotationx:0,rotationy:0,rotation:.2,scalex:2,scaley:2},transition:{enable:!0,cross:!0,duration:2e3,easing:"Power3.easeOut",speedx:0,speedy:0,rotationx:0,rotationy:0,rotation:0,scalex:2,scaley:2,power:!1},interaction:{enable:!0,event:"mousemove",duration:300,easing:"Power2.easeOut",speedx:0,speedy:0,scalex:0,scaley:0,rotation:.4,disablemobile:!0}}},fibers_small:{title:"Fibers Small",preset:{enable:!0,map:{image:"Fibers",size:"Small",custom:""},animation:{enable:!0,speedx:.5,speedy:-.5,rotationx:0,rotationy:0,rotation:0,scalex:4,scaley:4},transition:{enable:!1,cross:!0,duration:2e3,easing:"Power3.easeOut",speedx:0,speedy:0,rotationx:0,rotationy:0,rotation:0,scalex:0,scaley:0,power:!1},interaction:{enable:!1,event:"mousemove",duration:300,easing:"Power2.easeOut",speedx:0,speedy:0,scalex:2,scaley:2,rotation:0,disablemobile:!1}}},spiral_large:{title:"Spiral Large",preset:{enable:!0,map:{image:"Spiral",size:"Large",custom:""},animation:{enable:!0,speedx:0,speedy:0,rotationx:0,rotationy:0,rotation:-.2,scalex:5,scaley:5},transition:{enable:!1,cross:!0,duration:2e3,easing:"Power3.easeOut",speedx:0,speedy:0,rotationx:0,rotationy:0,rotation:0,scalex:0,scaley:0,power:!1},interaction:{enable:!1,event:"mousemove",duration:300,easing:"Power2.easeOut",speedx:0,speedy:0,scalex:0,scaley:0,rotation:-.3,disablemobile:!1}}},glitch_small:{title:"Glitch Small",preset:{enable:!0,map:{image:"Glitch",size:"Small",custom:""},animation:{enable:!0,speedx:50,speedy:0,rotationx:0,rotationy:0,rotation:0,scalex:0,scaley:0},transition:{enable:!1,cross:!0,duration:2e3,easing:"Power3.easeOut",speedx:50,speedy:0,rotationx:0,rotationy:0,rotation:0,scalex:15,scaley:5,power:!1},interaction:{enable:!0,event:"mousemove",duration:300,easing:"Power2.easeOut",speedx:10,speedy:0,scalex:15,scaley:5,rotation:0,disablemobile:!0}}}},e.customs=void 0===revslider_liquideffect_addon.custom_templates?{}:revslider_liquideffect_addon.custom_templates,d=RVS.F.createPresets({groupid:"distortion_templates",title:i.bmlibrary,customevt:"distortionAjax",groups:{defaults:{title:i.presets,elements:e.defaults},custom:{title:i.customprests,elements:e.customs}},onclick:l.presets}),r="",r+='<div class="form_inner_header"><i class="material-icons">fingerprint</i>'+i.settings+"</div>",r+='<div class="collapsable" style="display:block !important; padding: 0">',r+=' \t<div style="padding: 20px 20px 0 20px">',r+="\t\t\t<label_a>"+i.active+"</label_a",r+=' \t\t><input type="checkbox" id="distortion_enable" class="slideinput easyinit" data-r="addOns.'+a+'.enable" data-showhide="#distortion_slide_settings,.distortion_hide_wrap" data-showhidedep="true" value="off">',r+=' \t\t<span class="linebreak"></span>',r+='\t\t\t<row class="direktrow distortion_hide_wrap">',r+="\t\t\t\t<longoption><label_a>"+i.useBG+"</label_a",r+=' \t\t\t><input type="checkbox" id="distortion_BG_settings" class="slideinput easyinit" data-r="addOns.'+a+'.useBGsettings" value="off">',r+="\t\t\t\t</longoption>",r+=' \t\t\t<span class="linebreak"></span>',r+=' \t\t\t<div class="div10"></div>',r+="\t\t\t</row>",r+='\t\t\t<row class="direktrow distortion_hide_wrap">',r+=" \t\t\t<label_a>"+i.use+"</label_a",r+='    \t\t\t><select id="draw_using" class="slideinput tos2 nosearchbox easyinit" data-r="addOns.'+a+'.use">',r+=' \t\t\t\t<option value="default">Default Image</option>',r+=' \t\t\t\t<option value="canvas">Canvas</option>',r+="    \t\t\t</select>",r+="\t\t\t</row>",r+=' \t\t<div class="div10"></div>',r+=" \t</div>",r+=' \t<div id="distortion_slide_settings">',r+=' \t\t<div style="padding: 0 20px">',r+=' \t\t\t<row id="distortion_note" class="direktrow" style="margin-top: -10px">',r+=' \t\t\t\t<div class="div5"></div>',r+='\t\t\t\t\t<labelhalf><i class="material-icons">sms_failed</i></labelhalf',r+=' \t\t\t\t><contenthalf class="function_info">'+i.note+"</contenthalf>",r+=' \t\t\t\t<div class="div10"></div>',r+=" \t\t\t</row>",r+=" \t\t</div>",r+=' \t\t<div id="distortion_map_wrap" class="form_inner_header" style="margin-top: 20px"><i class="material-icons">map</i>'+i.map+"</div>",r+=' \t\t<div style="padding: 20px">',r+=d,r+=" \t\t\t<label_a>"+i.imagemap+"</label_a",r+='     \t\t><select id="distortion_map" class="slideinput tos2 nosearchbox easyinit callEvent" data-r="addOns.'+a+'.map.image" data-evt="distortionUpdateDisplay" data-showprio="hide" data-hide="#distortion_choose_image:not(.distortion-choose_hide_*val*), .distortion-size_hide_*val*" data-show="#distortion_size_wrap:not(.distortion-size_hide_*val*), .distortion-choose_hide_*val*">',r+=' \t\t\t\t<option value="Ripple">Ripple</option>',r+=' \t\t\t\t<option value="Clouds">Clouds</option>',r+=' \t\t\t\t<option value="Crystalize">Crystalize</option>',r+=' \t\t\t\t<option value="Fibers">Fibers</option>',r+=' \t\t\t\t<option value="Pointilize">Pointilize</option>',r+=' \t\t\t\t<option value="Rings">Rings</option>',r+=' \t\t\t\t<option value="Maze">Maze</option>',r+=' \t\t\t\t<option value="Glitch">Glitch</option>',r+=' \t\t\t\t<option value="Swirl">Swirl</option>',r+=' \t\t\t\t<option value="Spiral">Spiral</option>',r+=' \t\t\t\t<option value="Custom Map">Custom Map</option>',r+="     \t\t</select>",r+=' \t\t\t<span class="linebreak"></span>',r+=' \t\t\t<div id="distortion_size_wrap" class="distortion-size_hide_CustomMap">',r+="\t\t\t\t\t<label_a>"+i.size+"</label_a",r+='     \t\t\t><select id="distortion_map_size" class="slideinput tos2 nosearchbox easyinit" data-r="addOns.'+a+'.map.size">',r+=' \t\t\t\t\t<option value="Small">Small</option>',r+=' \t\t\t\t\t<option value="Large">Large</option>',r+=" \t\t\t\t</select>",r+=' \t\t\t\t<span class="linebreak"></span>',r+=" \t\t\t</div>",r+=' \t\t\t<div id="distortion_choose_image" class="distortion-choose_hide_CustomMap">',r+="\t\t\t\t\t<label_a></label_a",r+=' \t\t\t\t><div id="distortion_custom_image" class="getImageFromMediaLibrary basic_action_button longbutton callEventButton" data-evt="distortionChooseImage"><i class="material-icons">style</i>'+i.library+"</div>",r+=" \t\t\t</div>",r+=' \t\t\t<div id="distortion_image_wrap">',r+="\t\t\t\t\t<label_a></label_a",r+=' \t\t\t\t><div id="distortion_preview" style="display: inline-block; margin-bottom: 10px; width: 185px; height: 100px; background-size: cover; background-repeat: none; background-position: center center"></div>',r+=" \t\t\t</div>",r+='       <div id="distortion_image-scale">',r+="\t\t\t\t\t<label_a>"+i.imagescale+"</label_a",r+='     \t\t\t><input type="text" class="slideinput easyinit" data-r="addOns.'+a+'.map.imagescale" data-numeric="true" data-allowed="%" data-min="50" data-max="150" value="120">',r+="       </div>",r+=" \t\t</div>",r+=' \t\t<div id="distortion_animation_wrap" class="form_inner_header"><i class="material-icons">movie</i>'+i.animation+"</div>",r+=' \t\t<div style="padding: 20px">',r+="\t\t\t\t<label_a>"+i.active+"</label_a",r+=' \t\t\t><input type="checkbox" id="distortion_animation_enable" class="slideinput easyinit" data-r="addOns.'+a+'.animation.enable" data-showhide="#distortion_animation_settings" data-showhidedep="true" value="off">',r+=' \t\t\t<div id="distortion_animation_settings">',r+='\t\t\t\t\t<row class="direktrow">',r+='\t\t\t\t\t\t<onelong><label_icon class="ui_x_start"></label_icon><input class="slideinput easyinit shortfield" data-numeric="true" data-allowed="ms" data-r="addOns.'+a+'.animation.speedx" type="text"></onelong>',r+='\t\t\t\t\t\t<oneshort><label_icon class="ui_y_start"></label_icon><input class="slideinput easyinit shortfield" data-numeric="true" data-allowed="ms" data-r="addOns.'+a+'.animation.speedy" type="text"></oneshort>',r+="\t\t\t\t\t</row>",r+=' \t\t\t\t<span class="linebreak"></span>',r+='\t\t\t\t\t<row class="direktrow">',r+='\t\t\t\t\t\t<onelong><label_icon class="ui_x"></label_icon><input class="slideinput easyinit shortfield" data-numeric="true" data-allowed="%" data-r="addOns.'+a+'.animation.scalex" type="text"></onelong>',r+='\t\t\t\t\t\t<oneshort><label_icon class="ui_y"></label_icon><input class="slideinput easyinit shortfield" data-numeric="true" data-allowed="%" data-r="addOns.'+a+'.animation.scaley" type="text"></oneshort>',r+="\t\t\t\t\t</row>",r+=' \t\t\t\t<span class="linebreak"></span>',r+='\t\t\t\t\t<row class="direktrow">',r+='\t\t\t\t\t\t<onelong><label_icon class="ui_rotatex"></label_icon><input class="slideinput easyinit shortfield" data-numeric="true" data-allowed="deg" data-r="addOns.'+a+'.animation.rotationx" type="text"></onelong>',r+='\t\t\t\t\t\t<oneshort><label_icon class="ui_rotatey"></label_icon><input class="slideinput easyinit shortfield" data-numeric="true" data-allowed="deg" data-r="addOns.'+a+'.animation.rotationy" type="text"></oneshort>',r+="\t\t\t\t\t</row>",r+=' \t\t\t\t<span class="linebreak"></span>',r+='\t\t\t\t\t<row class="direktrow">',r+='\t\t\t\t\t\t<onelong><label_icon class="ui_rotatez"></label_icon><input class="slideinput easyinit shortfield" data-numeric="true" data-allowed="deg" data-r="addOns.'+a+'.animation.rotation" type="text"></onelong>',r+="\t\t\t\t\t</row>",r+=" \t\t\t</div>",r+=" \t\t</div>",r+=' \t\t<div id="distortion_transition_wrap" class="form_inner_header"><i class="material-icons">flash_on</i>'+i.transition+"</div>",r+=' \t\t<div style="padding: 20px">',r+="\t\t\t\t<label_a>"+i.active+"</label_a",r+=' \t\t\t><input type="checkbox" id="distortion_transition_enable" class="slideinput easyinit" data-r="addOns.'+a+'.transition.enable" data-showhide="#distortion_transition_settings" data-showhidedep="true" value="off">',r+=' \t\t\t<div id="distortion_transition_settings">',r+="\t\t\t\t\t<label_a>"+i.easing+"</label_a",r+='     \t\t\t><select class="slideinput tos2 nosearchbox easyinit easingSelect" data-r="addOns.'+a+'.transition.easing" data-theme="dark"></select>',r+=' \t\t\t\t<span class="linebreak"></span>',r+="\t\t\t\t\t<label_a>"+i.duration+"</label_a",r+='     \t\t\t><input type="text" class="slideinput easyinit" data-r="addOns.'+a+'.transition.duration" data-numeric="true" data-allowed="ms" data-min="300" data-max="10000">',r+='\t\t\t\t\t<row class="direktrow">',r+='\t\t\t\t\t\t<onelong><label_icon class="ui_x_start"></label_icon><input class="slideinput easyinit shortfield" data-numeric="true" data-allowed="ms" data-r="addOns.'+a+'.transition.speedx" type="text"></onelong>',r+='\t\t\t\t\t\t<oneshort><label_icon class="ui_y_start"></label_icon><input class="slideinput easyinit shortfield" data-numeric="true" data-allowed="ms" data-r="addOns.'+a+'.transition.speedy" type="text"></oneshort>',r+="\t\t\t\t\t</row>",r+='\t\t\t\t\t<row class="direktrow">',r+='\t\t\t\t\t\t<onelong><label_icon class="ui_x"></label_icon><input class="slideinput easyinit shortfield" data-numeric="true" data-allowed="%" data-r="addOns.'+a+'.transition.scalex" type="text"></onelong>',r+='\t\t\t\t\t\t<oneshort><label_icon class="ui_y"></label_icon><input class="slideinput easyinit shortfield" data-numeric="true" data-allowed="%" data-r="addOns.'+a+'.transition.scaley" type="text"></oneshort>',r+="\t\t\t\t\t</row>",r+='\t\t\t\t\t<row class="direktrow">',r+='\t\t\t\t\t\t<onelong><label_icon class="ui_rotatex"></label_icon><input class="slideinput easyinit shortfield" data-numeric="true" data-allowed="deg" data-r="addOns.'+a+'.transition.rotationx" type="text"></onelong>',r+='\t\t\t\t\t\t<oneshort><label_icon class="ui_rotatey"></label_icon><input class="slideinput easyinit shortfield" data-numeric="true" data-allowed="deg" data-r="addOns.'+a+'.transition.rotationy" type="text"></oneshort>',r+="\t\t\t\t\t</row>",r+='\t\t\t\t\t<row class="direktrow">',r+='\t\t\t\t\t\t<onelong><label_icon class="ui_rotatez"></label_icon><input class="slideinput easyinit shortfield" data-numeric="true" data-allowed="deg" data-r="addOns.'+a+'.transition.rotation" type="text"></onelong>',r+='\t\t\t\t\t\t<oneshort><i class="material-icons" style="width: 30px; height: 30px; text-align: center; color: #b7bbc0; font-size: 17px; margin-right: 5px">power</i><input type="checkbox" id="distortion_transpower" class="slideinput easyinit" data-r="addOns.'+a+'.transition.power" value="off"></oneshort>',r+="\t\t\t\t\t</row>",r+='\t\t\t\t\t<row class="direktrow" style="padding-top: 10px">',r+='\t\t\t\t\t\t<labelhalf><i class="material-icons">sms_failed</i></labelhalf>',r+='\t\t\t\t\t\t<contenthalf><div class="function_info">'+i.transmessage+"</div></contenthalf>",r+="\t\t\t\t\t</row>",r+=" \t\t\t</div>",r+=" \t\t</div>",r+=' \t\t<div id="distortion_interaction_wrap" class="form_inner_header"><i class="material-icons">gamepad</i>'+i.interaction+"</div>",r+=' \t\t<div style="padding: 20px">',r+="\t\t\t\t<label_a>"+i.active+"</label_a",r+=' \t\t\t><input type="checkbox" id="distortion_interaction_enable" class="slideinput easyinit" data-r="addOns.'+a+'.interaction.enable" data-showhide="#distortion_interaction_settings" data-showhidedep="true" value="off">',r+=' \t\t\t<div id="distortion_interaction_settings">',r+="\t\t\t\t\t<label_a>"+i.mobile+"</label_a",r+=' \t\t\t\t><input type="checkbox" id="distortion_disablemobile" class="slideinput easyinit" data-r="addOns.'+a+'.interaction.disablemobile" value="off">',r+=' \t\t\t\t<span class="linebreak"></span>',r+="\t\t\t\t\t<label_a>"+i.mouse+"</label_a",r+='     \t\t\t><select id="distortion_mouse_event" class="slideinput tos2 nosearchbox easyinit" data-r="addOns.'+a+'.interaction.event">',r+=' \t\t\t\t\t<option value="mousedown">Mouse Down</option>',r+=' \t\t\t\t\t<option value="mousemove">Mouse Move</option>',r+=" \t\t\t\t</select>",r+=' \t\t\t\t<span class="linebreak"></span>',r+="\t\t\t\t\t<label_a>"+i.easing+"</label_a",r+='     \t\t\t><select class="slideinput tos2 nosearchbox easyinit easingSelect" data-r="addOns.'+a+'.interaction.easing" data-theme="dark"></select>',r+=' \t\t\t\t<span class="linebreak"></span>',r+="\t\t\t\t\t<label_a>"+i.duration+"</label_a",r+='     \t\t\t><input type="text" class="slideinput easyinit" data-r="addOns.'+a+'.interaction.duration" data-numeric="true" data-allowed="ms" data-min="300" data-max="10000">',r+=' \t\t\t\t<span class="linebreak"></span>',r+='\t\t\t\t\t<row class="direktrow">',r+='\t\t\t\t\t\t<onelong><label_icon class="ui_x_start"></label_icon><input class="slideinput easyinit shortfield" data-numeric="true" data-allowed="ms" data-r="addOns.'+a+'.interaction.speedx" type="text"></onelong>',r+='\t\t\t\t\t\t<oneshort><label_icon class="ui_y_start"></label_icon><input class="slideinput easyinit shortfield" data-numeric="true" data-allowed="ms" data-r="addOns.'+a+'.interaction.speedy" type="text"></oneshort>',r+="\t\t\t\t\t</row>",r+='\t\t\t\t\t<row class="direktrow">',r+='\t\t\t\t\t\t<onelong><label_icon class="ui_x"></label_icon><input class="slideinput easyinit shortfield" data-numeric="true" data-allowed="%" data-r="addOns.'+a+'.interaction.scalex" type="text"></onelong>',r+='\t\t\t\t\t\t<oneshort><label_icon class="ui_y"></label_icon><input class="slideinput easyinit shortfield" data-numeric="true" data-allowed="%" data-r="addOns.'+a+'.interaction.scaley" type="text"></oneshort>',r+="\t\t\t\t\t</row>",r+='\t\t\t\t\t<row class="direktrow">',r+='\t\t\t\t\t\t<onelong><label_icon class="ui_rotatez"></label_icon><input class="slideinput easyinit shortfield" data-numeric="true" data-allowed="deg" data-r="addOns.'+a+'.interaction.rotation" type="text"></onelong>',r+="\t\t\t\t\t</row>",r+='\t\t\t\t\t<row class="direktrow" style="padding-top: 10px">',r+='\t\t\t\t\t\t<labelhalf><i class="material-icons">sms_failed</i></labelhalf>',r+='\t\t\t\t\t\t<contenthalf><div class="function_info">'+i.intermessage+"</div></contenthalf>",r+="\t\t\t\t\t</row>",r+=" \t\t\t</div>",r+=" \t\t</div>",r+=" \t</div>",r+="</div>",e.forms.slidegeneral.append(r),e.forms.imageWrap=t("#distortion_image_wrap"),e.forms.preview=t("#distortion_preview"),e.forms.note=t("#distortion_note"),RVS.DOC.on("SceneUpdatedAfterRestore.distortioneffect distortionUpdateDisplay",l.updateDisplay).on("newSlideCreated",l.newSlideCreated).on("redrawSlideBGDone",l.slideBgUpdated).on("distortionChooseImage",l.chooseImage).on("distortionAjax",l.ajax),function(){e.forms.slidegeneral.find(".easingSelect").each((function(){RVS.F.createEaseOptions(this)})),e.forms.slidegeneral.find(".tos2.nosearchbox").ddTP({placeholder:i.placeholder_select}),-1===RVS.S.slideId.toString().search("static")&&RVS.F.updateEasyInputs({container:e.forms.slidegeneral,path:RVS.S.slideId+".slide.",trigger:"init"});RVS.F.initOnOff(e.forms.slidegeneral);jQuery("#distortion_enable").off("change.liquideffect").on("change.liquideffect",(function(){o(this.checked)}));o(n())}(),function(){if(revslider_liquideffect_addon.hasOwnProperty("help")&&"undefined"!=typeof HelpGuide){var e={slug:"liquideffect_addon"};t.extend(!0,e,revslider_liquideffect_addon.help),HelpGuide.add(e)}}(),l.updateDisplay(),e.initialised=!0):o(),e.isActive?(punchgs.TweenLite.set("#gst_slide_"+a,{display:"inline-block"}),c||-1!==RVS.S.slideId.toString().search("static")||(RVS.F.updateEasyInputs({container:e.forms.slidegeneral,path:RVS.S.slideId+".slide."}),l.updateDisplay()),"undefined"!=typeof HelpGuide&&HelpGuide.activate("liquideffect_addon")):(c||(punchgs.TweenLite.set("#gst_slide_"+a,{display:"none"}),t("#gst_slide_"+a).removeClass("selected")),"undefined"!=typeof HelpGuide&&HelpGuide.deactivate("liquideffect_addon"))}));var l={updateDisplay:function(){if(e.isActive&&-1===RVS.S.slideId.toString().search("static")&&(RVS.SLIDER[RVS.S.slideId].slide.addOns[a]=s(RVS.SLIDER[RVS.S.slideId].slide.addOns[a]),1)){var t=RVS.SLIDER[RVS.S.slideId].slide.addOns[a].map.image;(t="Custom Map"!==t?revslider_liquideffect_addon.baseurl+t.toLowerCase()+"_small.jpg":RVS.SLIDER[RVS.S.slideId].slide.addOns[a].map.custom)?(e.forms.preview.css("background-image","url("+t+")"),e.forms.imageWrap.show()):e.forms.imageWrap.hide(),o(n())}else o()},chooseImage:function(t,e){e&&e.urlImage&&(RVS.SLIDER[RVS.S.slideId].slide.addOns[a].map.custom=e.urlImage,l.updateDisplay())},slideBgUpdated:function(){var t,a=RVS.SLIDER[RVS.S.slideId].slide.bg.type;"image"!==a&&"external"!==a||(t="image"===a?RVS.SLIDER[RVS.S.slideId].slide.bg.image:RVS.SLIDER[RVS.S.slideId].slide.bg.externalSrc),t?e.forms.note.hide():e.forms.note.show(),l.updateDisplay()},newSlideCreated:function(t,i){e.isActive&&(RVS.SLIDER[i].slide.addOns[a]=s(RVS.SLIDER[i].slide.addOns[a]),RVS.F.updateEasyInputs({container:e.forms.slidegeneral,path:i+".slide."}),l.updateDisplay())},presets:function(t,s){RVS.F.openBackupGroup({id:"liquideffect",txt:i.presets,icon:"touch_app"});var n="true"===s||!0===s?e.customs[t].preset:e.defaults[t].preset;RVS.F.updateSliderObj({path:RVS.S.slideId+".slide.addOns."+a,val:n}),RVS.F.closeBackupGroup({id:"liquideffect"}),RVS.F.updateEasyInputs({container:e.forms.slidegeneral,path:RVS.S.slideId+".slide.",trigger:"init"}),l.updateDisplay()},ajax:function(i,s){var n;"overwrite"!==s.mode&&"create"!==s.mode||(n=t.extend(!0,{},RVS.SLIDER[RVS.S.slideId].slide.addOns[a])),"overwrite"!==s.mode&&"rename"!=s.mode||s.pl.data("key"),"rename"===s.mode&&(n=e.customs[s.key].preset,e.customs[s.key].title=s.newname),"delete"===s.mode?RVS.F.ajaxRequest("delete_custom_templates_"+a,{id:s.key},(function(t){t.success&&(delete e.customs[s.key],s.pl.remove())})):RVS.F.ajaxRequest("save_custom_templates_"+a,{id:s.key,obj:{title:s.newname,preset:n}},(function(t){t.success&&(e.customs[t.data.id]={title:s.newname,preset:n},"create"===s.mode&&(s.element[0].dataset.key=t.data.id),"rename"===s.mode&&s.pl.find(".cla_custom_name").text(s.newname))})),runonce=!0}}}(jQuery);