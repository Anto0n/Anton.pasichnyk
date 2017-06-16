package com.bionic.baglab.mail.template;

import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;

/**
 * Created by nicot on 6/12/2017.
 */
public class SimpleTemplateEngine implements TemplateEngine {

    private final String baseDir;

    public SimpleTemplateEngine(String baseDir) {
        this.baseDir = baseDir;
    }

    @Override
    public String build(String templateName, Map<String,?> values) {
        String template = getRawTemplate(templateName);
        return buildResultText(template, values);
    }

    private String buildResultText(String template, Map<String,?> values) {
        for (Map.Entry<String,?> entry : values.entrySet()) {
            String templateKey = "${" + entry.getKey() + "}";
            String templateValue = String.valueOf(entry.getValue());

            template = template.replace(templateKey, templateValue);
        }
        return template;
    }

    private String getRawTemplate(String templateName) {
        String fullPath = "/" + baseDir + "/" + templateName;
        try {
            URL resource = getClass().getResource(fullPath);
            Path path = Paths.get(resource.toURI());
            return new String(Files.readAllBytes(path));
        } catch (IOException e) {
            throw new RuntimeException("Can't read template from resource: " + fullPath, e);
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }
}
