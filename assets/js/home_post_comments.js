{
    createComment = async function(){
        let newCommentForm=$('#new-comment-form')
        newCommentForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(newCommentForm).serialize(),
                success: function(data){
                    console.log('data: ', data)
                    let newComment = newCommentDom(data.data);
                    $(`#post-comments-${data.data.comment.post}`).prepend(newComment);
                    
                    


                    //toggle like for comment
                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            });


        });
    }
    
    newCommentDom=(data)=>{
        const {comment,user}=data
    return $(`
    <li>
    <p>
       
        
            <small>
                <a class="delete-comment-button" href="/comments/destroy/ ${comment._id} ">X</a>
            </small>
            
             ${comment.content}
    <small>
         ${comment.user.name}
    </small>
        
    </p>
</li>
    `)    

    }
    function deletecomments(deletecomment)
{
    $(deletecomment).click(function(e){

e.preventDefault();

$.ajax({

    type:"get",
    url:$(deletecomment).prop('href'),
    success:function(data)
    {
        console.log('comment: inside ajax req ', data)
        // console.log(data.data.comments._id);      
        $(`#${data.data.comment._id}`).remove();  
    //    $(`#data.data.${comments._id}`).remove();

    },
    error:function(err)
    {
        console.log("Error is coming",err);
    }
    
})

})
}

$('.delete-comments').each(function(){

    deletecomments($(this));
})
    createComment()
    console.log('comments_hompost.js loaded')
}