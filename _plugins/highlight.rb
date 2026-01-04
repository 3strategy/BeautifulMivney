# _plugins/highlight.rb
Jekyll::Hooks.register [:posts, :pages, :documents], :pre_render do |doc|
  next if doc.content.nil?
  
  # Regex: Finds ==text== but ensures it's not inside backticks
  # This makes Jekyll match Blazor's Markdig (EmphasisExtras) behavior
  doc.content.gsub!(/(?<!`|<code>)==(.+?)==(?<!`|<\/code>)/, '<mark>\1</mark>')
end