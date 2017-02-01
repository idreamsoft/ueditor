UE.plugin.register('attachment', function (){
    var me = this;

    return {
       // outputRule: function(root){
       //     utils.each(root.getNodesByTagName('button'),function(a){
       //         var val;
       //         if(val = a.getAttr('file')){
       //             a.tagName = 'button';
       //             a.setAttr({
       //                 file : val,
       //                 // name : val,
       //                 'class' : ''
       //             })
       //         }
       //     })
       // },
       // inputRule:function(root){
       //     utils.each(root.getNodesByTagName('button'),function(a){
       //         var val;
       //         if((val = a.getAttr('file'))){
       //             a.tagName = 'button';
       //             a.setAttr({
       //                 file :a.getAttr('file'),
       //                 'class' : 'attachment'
       //             });
       //             a.setAttr('name')

       //         }
       //     })

       // },
       commands:{
           /**
            * 插入附件
            * @command attachment
            * @method execCommand
            * @param { String } cmd 命令字符串
            * @param { String } name 附件名称字符串
            * @example
            * ```javascript
            * //editor 是编辑器实例
            * editor.execCommand('attachment', 'attachment1');
            * ```
            */
           'attachment':{
               execCommand:function (cmd, filelist) {
                   var range = this.selection.getRange(),img = range.getClosedNode();
                   filelist = utils.isArray(filelist) ? filelist : [filelist];
                    var i, item, title,
                        html = '';
                    for (i = 0; i < filelist.length; i++) {
                        item = filelist[i];
                        title = item.title || item.url.substr(item.url.lastIndexOf('/') + 1);
                        html +='<p><input type="text" class="attachment" file="'+item.url+'" value="'+item.title+'" disabled="true" readonly="true"/></p>'
                        // html += '<p><img file="'+item.url+'" class="attachment" /><a href="'+item.url+'">'+item.title+'</a></p>';
                    }
                    me.execCommand('insertHtml', html);

                   // if (img && img.getAttribute('file')) {
                   //     if (name) {
                   //         img.setAttribute('file', name);
                   //     } else {
                   //         range.setStartBefore(img).setCursor();
                   //         domUtils.remove(img);
                   //     }
                   // } else {
                   //     if (name) {
                   //         //只在选区的开始插入
                   //         var attachment = this.document.createElement('img');
                   //         range.collapse(true);
                   //         domUtils.setAttributes(attachment,{
                   //             'file':name,
                   //             'class':'attachmentclass'
                   //         });
                   //         range.insertNode(attachment).setStartAfter(attachment).setCursor(false,true);
                   //     }
                   // }
               }
           }
       }
    }
});
