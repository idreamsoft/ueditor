UE.plugin.register('attachment', function (){
    var me = this;
    return {
       commands:{
           /**
            * 插入附件
            * @command attachment
            * @method execCommand
            * @param { String } cmd 命令字符串
            * @param { String } filelist 附件列表
            * @example
            * ```javascript
            * //editor 是编辑器实例
            * editor.execCommand('attachment', OBJ);
            * ```
            */
           'attachment':{
               execCommand:function (cmd, _filelist) {
                   var filelist = utils.isArray(_filelist) ? _filelist : [_filelist];
                   if(_filelist){
                      var i, item, title,
                          html = '';
                      for (i = 0; i < filelist.length; i++) {
                          item = filelist[i];
                          title = item.title || item.url.substr(item.url.lastIndexOf('/') + 1);
                          // html +='<p><input type="text" class="attachment" file="'+item.url+'" value="'+item.title+'" disabled="true" readonly="true"/></p>'
                          html +='<p><a class="attachment" '+
                                  'ext="'+item.ext+'"'+
                                  'fid="'+item.fid+'" '+
                                  'path="'+item.path+'" '+
                                  'href="'+item.url+'" '+
                                  'title="'+item.title+'"/>'+
                                  item.original+
                                  '</a></p>'
                          // html += '<p><img file="'+item.url+'" class="attachment" /><a href="'+item.url+'">'+item.title+'</a></p>';
                      }
                      me.execCommand('insertHtml', html);
                   }else{
                      var link = me.queryCommandValue('link');
                      var parent = link.parentNode;
                      if(parent.tagName == 'P'){
                        domUtils.remove(parent);
                      }else{
                        domUtils.remove(link);
                      }
                   }
               }
           }
       }
    }
});
