package es.lucasgp.cait.tfg.competition.model;

public class Participant {

    private int score;

    private String userId;
    private String trackingId;

    public int getScore() {
        return this.score;
    }

    public void setScore(final int score) {
        this.score = score;
    }

    public String getUserId() {
        return this.userId;
    }

    public void setUserId(final String userId) {
        this.userId = userId;
    }

    public String getTrackingId() {
        return this.trackingId;
    }

    public void setTrackingId(final String trackingId) {
        this.trackingId = trackingId;
    }

}
