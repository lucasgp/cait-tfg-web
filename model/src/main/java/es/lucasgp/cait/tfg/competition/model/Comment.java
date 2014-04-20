package es.lucasgp.cait.tfg.competition.model;

import java.util.Date;
import javax.validation.constraints.Size;
import org.springframework.data.mongodb.core.index.Indexed;

public class Comment {

    @Size(min = 1)
    @Indexed
    private String userId;
    @Size(min = 1)
    private String title;
    @Size(min = 1)
    private String content;

    private Date commentDate;

    public String getUserId() {
        return this.userId;
    }

    public void setUserId(final String userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(final String title) {
        this.title = title;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(final String content) {
        this.content = content;
    }

    public Date getCommentDate() {
        return commentDate;
    }

    public void setCommentDate(Date commentDate) {
        this.commentDate = commentDate;
    }

}
