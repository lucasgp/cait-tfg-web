package es.lucasgp.cait.tfg.competition.dto;

import java.util.List;

public class PageResult<T> {

    private int page;
    private long totalElements;

    private List<T> elements;

    public PageResult() {

    }

    public PageResult(List<T> elements) {
        this(elements, 0);
    }

    public PageResult(List<T> elements, int page) {
        this(elements, page, elements.size());
    }

    public PageResult(List<T> elements, int page, long totalElements) {
        this.elements = elements;
        this.page = page;
        this.totalElements = totalElements;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(long totalElements) {
        this.totalElements = totalElements;
    }

    public List<T> getElements() {
        return elements;
    }

    public void setElements(List<T> elements) {
        this.elements = elements;
    }

}
