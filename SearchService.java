package com.osint.service;

import com.osint.scraper.Scraper;

import java.util.Map;

public class SearchService {
    private Scraper scraper = new Scraper();

    public String search(String query) {
        Map<String, String> results = scraper.scrape(query);
        StringBuilder formattedResults = new StringBuilder("<ul>");
        for (Map.Entry<String, String> entry : results.entrySet()) {
            formattedResults.append("<li>").append(entry.getKey()).append(": ").append(entry.getValue()).append("</li>");
        }
        formattedResults.append("</ul>");
        return formattedResults.toString();
    }
}
