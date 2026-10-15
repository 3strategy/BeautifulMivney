# Translation groups are built from existing pages, never guessed client-side.
# New translations need only lang and translation_of front matter.
module LessonTranslations
  def self.key(url)
    url.sub(%r{/index\.html$}, "/").sub(/\.html$/, "").sub(%r{/$}, "")
  end

  class Generator < Jekyll::Generator
    safe true
    priority :low

    def generate(site)
      pages = site.pages
      originals = pages.to_h { |page| [LessonTranslations.key(page.url), page] }
      groups = {}

      pages.each do |page|
        original_url = page.data["translation_of"]
        # Register the established CollectCircles English directory without
        # adding repetitive metadata to every existing chapter.
        legacy_collect_circles = !original_url && page.path.start_with?("android/CollectCircles/en/")
        if legacy_collect_circles
          original_url = page.url.sub("/CollectCircles/en/", "/CollectCircles/")
        end
        next unless original_url

        original = originals[LessonTranslations.key(original_url)]
        raise "Missing translation source #{original_url} for #{page.path}" unless original

        language = page.data["lang"] || page.data["language"]
        raise "Missing lang for translation #{page.path}" unless language

        # The legacy source includes mixed-language chapters marked lang: en;
        # its separate /en copy is nevertheless the complete English edition.
        original_language = legacy_collect_circles ? "he" :
          (original.data["lang"] || original.data["language"] || "he")
        original.data["lang"] = "he" if legacy_collect_circles
        group = groups[original.url] ||= { original_language => original.url }
        if group.key?(language) && group[language] != page.url
          raise "Duplicate #{language} translation of #{original.url}"
        end
        group[language] = page.url
      end

      groups.each_value do |versions|
        versions.each_value do |url|
          originals[LessonTranslations.key(url)].data["translation_versions"] = versions
        end
      end
    end
  end
end
