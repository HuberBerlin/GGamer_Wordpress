!function(t){var a={},e="revslider-paintbrush-addon",i=revslider_paintbrush_addon.bricks;function s(t){return void 0===t||void 0===t.image?{enable:!1,image:{source:"local",custom:"",blur:{enable:!1,amount:10,responsive:!1,fixedges:{enable:!1,amount:10}}},brush:{style:"round",size:80,responsive:!1,disappear:{enable:!1,time:1e3}},mobile:{disable:!1,fallback:!1}}:t}RVS.DOC.on(e+"_init",(function(){a.isActive=RVS.SLIDER.settings.addOns[e].enable,a.isActive&&function(){var t=RVS.SLIDER.slideIDs;for(var a in t)if(t.hasOwnProperty(a)){var i=t[a];-1===i.toString().search("static")&&(RVS.SLIDER[i].slide.addOns[e]=s(RVS.SLIDER[i].slide.addOns[e]))}}();var n,l=!a.initialised;l&&a.isActive&&(RVS.F.addOnContainer.create({slug:e,icon:"format_paint",title:i.paintbrush,alias:i.paintbrush,slide:!0}),a.forms={slidegeneral:t("#form_slidegeneral_"+e)},n="",n+='<div class="form_inner_header"><i class="material-icons">format_paint</i>'+i.imagesettings+"</div>",n+='<div class="collapsable" style="display:block !important; padding: 0">',n+=' \t<div style="padding: 20px 20px 0 20px">',n+="\t\t\t<label_a>"+i.active+"</label_a",n+=' \t\t><input type="checkbox" id="paintbrush_enable" class="slideinput easyinit" data-r="addOns.'+e+'.enable" data-showhide=".paintbrush_slide_settings" data-showhidedep="true" value="off">',n+=" \t</div>",n+=' \t<div class="paintbrush_slide_settings">',n+=' \t\t<div style="padding: 0 20px">',n+="\t\t\t\t<label_a>"+i.source+"</label_a",n+='     \t\t><select id="paintbrush_image_source" class="slideinput tos2 nosearchbox easyinit callEvent" data-r="addOns.'+e+'.image.source" data-evt="paintbrushUpdatePreview" data-showprio="hide" data-show="#paintbrush_select_image:not(.paintbrush-os_hide_*val*)" data-hide=".paintbrush-os_hide_*val*">',n+=' \t\t\t\t<option value="local" selected>'+i.custom+"</option>",n+=' \t\t\t\t<option value="main">'+i.slidebg+"</option>",n+="     \t\t</select>",n+=' \t\t\t<input type="hidden" data-r="addOns.'+e+'.image.custom">',n+=' \t\t    <div id="paintbrush_select_image" class="paintbrush-os_hide_main">',n+="\t\t\t\t\t<label_a></label_a",n+=' \t\t\t\t><div class="getImageFromMediaLibrary basic_action_button longbutton callEventButton" data-evt="paintbrushUpdatePreview" data-r="#slide#.slide.addOns.'+e+'.image.custom"><i class="material-icons">style</i>'+i.medialibrary+"</div>",n+=' \t\t\t\t<span class="linebreak"></span>',n+="\t\t\t\t\t<label_a></label_a",n+=' \t\t\t\t><div class="getImageFromObjectLibrary basic_action_button longbutton callEventButton" data-evt="paintbrushUpdatePreview" data-r="#slide#.slide.addOns.'+e+'.image.custom"><i class="material-icons">style</i>'+i.objectlibrary+"</div>",n+=' \t\t\t\t<span class="linebreak"></span>',n+=" \t\t\t</div>",n+=' \t\t\t<div id="paintbrush_note">',n+=' \t\t\t\t<row class="direktrow">',n+=' \t\t\t\t\t<div class="div5"></div>',n+='\t\t\t\t\t\t<labelhalf><i class="material-icons">sms_failed</i></labelhalf',n+=' \t\t\t\t\t><contenthalf class="function_info">'+i.note+"</contenthalf>",n+=' \t\t\t\t\t<div class="div20"></div>',n+=" \t\t\t\t</row>",n+=" \t\t\t</div>",n+=' \t\t\t<div id="paintbrush_image_wrap" style="display: none">',n+="\t\t\t\t\t<label_a></label_a",n+=' \t\t\t\t><div id="paintbrush_preview" style="display: inline-block; margin-bottom: 10px; width: 185px; height: 100px; background-size: cover; background-repeat: none; background-position: center center"></div>',n+=" \t\t\t</div>",n+="\t\t\t\t<label_a>"+i.blurimage+"</label_a",n+=' \t\t\t><input type="checkbox" id="paintbrush_blur_enable" class="slideinput easyinit" data-r="addOns.'+e+'.image.blur.enable" data-showhide=".paintbrush_blur_settings" data-showhidedep="true" value="off">',n+=' \t\t    <div class="paintbrush_blur_settings">',n+="\t\t\t\t\t<label_a>"+i.bluramount+"</label_a",n+='     \t\t\t><input type="text" class="slideinput easyinit" data-r="addOns.'+e+'.image.blur.amount" data-numeric="true" data-allowed="px" data-min="1" data-max="100" value="10">',n+=' \t\t\t\t<span class="linebreak"></span>',n+="\t\t\t\t\t<label_a>"+i.responsive+"</label_a",n+=' \t\t\t\t><input type="checkbox" id="paintbrush_responsive_blur" class="slideinput easyinit" data-r="addOns.'+e+'.image.blur.responsive" value="off">',n+=' \t\t\t\t<span class="linebreak"></span>',n+="\t\t\t\t\t<label_a>"+i.fixedges+"</label_a",n+=' \t\t\t\t><input type="checkbox" id="paintbrush_fixedges" class="slideinput easyinit" data-r="addOns.'+e+'.image.blur.fixedges.enable" data-showhide=".paintbrush_fixedges_settings" data-showhidedep="true" value="off">',n+=' \t\t\t\t<div class="paintbrush_fixedges_settings">',n+="\t\t\t\t\t\t<label_a>"+i.stretchamount+"</label_a",n+='     \t\t\t\t><input type="text" class="slideinput easyinit" data-r="addOns.'+e+'.image.blur.fixedges.amount" data-numeric="true" data-allowed="%" data-min="0" data-max="100" value="10">',n+=" \t\t\t\t</div>",n+=" \t\t\t</div>",n+=" \t\t</div>",n+=' \t\t<div id="paintbrush_brush_settings" class="form_inner_header" style="margin-top: 20px"><i class="material-icons">brush</i>'+i.brushsettings+"</div>",n+=' \t\t<div style="padding: 20px">',n+="\t\t\t\t<label_a>"+i.brushstyle+"</label_a",n+='     \t\t><select id="paintbrush_brush_style" class="slideinput tos2 nosearchbox easyinit" data-r="addOns.'+e+'.brush.style">',n+=' \t\t\t\t<option value="round">Round</option>',n+=' \t\t\t\t<option value="square">Square</option>',n+=' \t\t\t\t<option value="butt">Butt</option>',n+="     \t\t</select>",n+=' \t\t\t<span class="linebreak"></span>',n+="\t\t\t\t<label_a>"+i.brushsize+"</label_a",n+='     \t\t><input type="text" class="slideinput easyinit" data-r="addOns.'+e+'.brush.size" data-allowed="px" data-numeric="true" data-min="5" data-max="500" value="80">',n+=' \t\t\t<span class="linebreak"></span>',n+="\t\t\t\t<label_a>"+i.brushstrength+"</label_a",n+='     \t\t><input type="text" class="slideinput easyinit" data-r="addOns.'+e+'.brush.strength" data-allowed="px" data-numeric="true" data-min="0" data-max="500" value="30">',n+=' \t\t\t<span class="linebreak"></span>',n+="\t\t\t\t<label_a>"+i.responsive+"</label_a",n+=' \t\t\t><input type="checkbox" id="paintbrush_responsivesize" class="slideinput easyinit" data-r="addOns.'+e+'.brush.responsive" value="off">',n+=' \t\t\t<span class="linebreak"></span>',n+="\t\t\t\t<label_a>"+i.disappear+"</label_a",n+=' \t\t\t><input type="checkbox" id="paintbrush_disappear" class="slideinput easyinit" data-r="addOns.'+e+'.brush.disappear.enable" data-showhide=".paintbrush_disappear_settings" data-showhidedep="true" value="off">',n+=' \t\t\t<div class="paintbrush_disappear_settings">',n+="\t\t\t\t\t<label_a>"+i.fadetime+"</label_a",n+='     \t\t\t><input type="text" class="slideinput easyinit" data-r="addOns.'+e+'.brush.disappear.time" data-numeric="true" data-allowed="ms" data-min="100" data-max="10000" value="1000">',n+=" \t\t\t</div>",n+=" \t\t</div>",n+=' \t\t<div id="paintbrush_mobile_settings" class="form_inner_header"><i class="material-icons">phone_iphone</i>'+i.mobile+"</div>",n+=' \t\t<div style="padding: 20px">',n+="\t\t\t\t<label_a>"+i.disable+"</label_a",n+=' \t\t\t><input type="checkbox" id="paintbrush_mobiledisable" class="slideinput easyinit" data-r="addOns.'+e+'.mobile.disable" value="off" data-showhide="#paintbrush_mobile_settings" data-showhidedep="true">',n+=' \t\t\t<div id="paintbrush_mobile_settings">',n+="\t\t\t\t\t<label_a>"+i.fallback+"</label_a",n+=' \t\t\t\t><input type="checkbox" id="paintbrush_mobilefallback" class="slideinput easyinit" data-r="addOns.'+e+'.mobile.fallback" value="off">',n+=" \t\t\t</div>",n+=" \t\t</div>",n+=" \t</div>",n+="</div>",a.forms.slidegeneral.append(n),a.forms.imageWrap=t("#paintbrush_image_wrap"),a.forms.imagePreview=t("#paintbrush_preview"),a.forms.note=t("#paintbrush_note"),RVS.DOC.on("SceneUpdatedAfterRestore.paintbrush redrawSlideBGDone paintbrushUpdatePreview",d.updateDisplay).on("newSlideCreated",d.newSlideCreated),function(){a.forms.slidegeneral.find(".tos2.nosearchbox").ddTP({placeholder:i.placeholder_select}),-1===RVS.S.slideId.toString().search("static")&&RVS.F.updateEasyInputs({container:a.forms.slidegeneral,path:RVS.S.slideId+".slide.",trigger:"init"});RVS.F.initOnOff(a.forms.slidegeneral)}(),function(){if(revslider_paintbrush_addon.hasOwnProperty("help")&&"undefined"!=typeof HelpGuide){var a={slug:"paintbrush_addon"};t.extend(!0,a,revslider_paintbrush_addon.help),HelpGuide.add(a)}}(),d.updateDisplay(),a.initialised=!0),a.isActive?(punchgs.TweenLite.set("#gst_slide_"+e,{display:"inline-block"}),l||-1!==RVS.S.slideId.toString().search("static")||(RVS.F.updateEasyInputs({container:a.forms.slidegeneral,path:RVS.S.slideId+".slide."}),d.updateDisplay()),"undefined"!=typeof HelpGuide&&HelpGuide.activate("paintbrush_addon")):(l||(punchgs.TweenLite.set("#gst_slide_"+e,{display:"none"}),t("#gst_slide_"+e).removeClass("selected")),"undefined"!=typeof HelpGuide&&HelpGuide.deactivate("paintbrush_addon"))}));var d={updateDisplay:function(){var t,i;a.isActive&&-1===RVS.S.slideId.toString().search("static")&&(RVS.SLIDER[RVS.S.slideId].slide.addOns[e]=s(RVS.SLIDER[RVS.S.slideId].slide.addOns[e]),1)&&("main"===RVS.SLIDER[RVS.S.slideId].slide.addOns[e].image.source?(t=i=RVS.F.getSlideBGDrawObj().backgroundImage,i&&"url()"!==i?a.forms.note.hide():a.forms.note.show()):(t=RVS.SLIDER[RVS.S.slideId].slide.addOns[e].image.custom,a.forms.note.hide(),i="url("+t+")"),t&&"url()"!==t?(a.forms.imagePreview.css("background-image",i),a.forms.imageWrap.show()):a.forms.imageWrap.hide())},newSlideCreated:function(t,i){a.isActive&&(RVS.SLIDER[i].slide.addOns[e]=s(RVS.SLIDER[i].slide.addOns[e]),RVS.F.updateEasyInputs({container:a.forms.slidegeneral,path:i+".slide."}),d.updateDisplay())}}}(jQuery);