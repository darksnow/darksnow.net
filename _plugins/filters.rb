module Jekyll
  module SlugFilter
    def slug(str)
      str.downcase.gsub(' ', '-')
    end
  end
end

Liquid::Template.register_filter(Jekyll::SlugFilter)
