{
console.log('home_posts.js loaded')
// method to submit the form using AJAX request
let createPost=()=>{
    let newPostForm= $('#new-post-form')
    newPostForm.submit((e)=>{
        e.preventDefault();
        $.ajax({
            type:'POST',
            url:'posts/create',
            data:newPostForm.serialize(),
            success:(data)=>{
                let newPost= newPostDom(data.data.post)
                console.log(data)
                $('#posts-list-container>ul').prepend(newPost)
                console.log($('.delete-post-button' ))
                deletePost($('.delete-post-button',newPost ))
                

            },
            error:(error)=>{
                console.log("error",error.responseText);
            }
        })
    })
        
    }
    // method to create a post in DOM
    
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
                    <p>
                        
                        <small>
                            <a class="delete-post-button"  href="/posts/destroy/${ post._id }">X</a>
                        </small>
                       
                        ${ post.content }
                        <br>
                        <small>
                        ${ post.user.name }
                        </small>

                        <br>
                        <small>
                          <a href="/likes/toggle/?id=${post._id}&type=Post" class="toggle-like-button" data-likes="0">
                          
                          0 Likes
                          </a>
                                        
                        </small>
                    </p>
                    <div class="post-comments">
                        
                            <form id="post-${ post._id }-comments-form" action="/comments/create" method="POST">
                                <input type="text" name="content" placeholder="Type Here to add comment..." required>
                                <input type="hidden" name="post" value="${ post._id }" >
                                <input type="submit" value="Add Comment">
                            </form>
               
                
                        <div class="post-comments-list">
                            <ul id="post-comments-${ post._id }">
                                
                            </ul>
                        </div>
                    </div>
                    
                </li>`)
    }

    let deletePost=(deleteLink)=>{
        $(deleteLink).click((e)=>{

            e.preventDefault();
            $.ajax({
                type:'Get',
                url:$(deleteLink).prop('href'),
                success:(data)=>{
                    console.log('data:',data)
                    $(`#post-${data.data.post_id}`).remove()


                },
                error:(error)=>{

                    console.log(error.responseText);
                }
            })
        })

    }
    createPost();
//     $('.delete-post-button').click(deletePost())
}