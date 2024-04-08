// musical-ideas.js - a generator for video game soundtrack composition ideas
// Author: Gyle Viloria
// Date: April 7, 2024

function main() {
  const fillers = {
    key: ["A", "B/C♭", "B♭", "C", "C♯/D♭", "D", "E", "E♭", "F", "G", "F♯/G♭"],
    // more common to get Major/Minor
    mode: ["Major (Ionian)", "Major (Ionian)", "Minor (Aeolian)", "Minor (Aeolian)", "Dorian", "Lydian"],
    
    titles: ["$title_article_plural $title_pre $title_post_plural", "$title_article $title_pre $title_post"],
    
    title_article: ["", "", "The", "The", "A(n)"],
    title_article_plural: ["", "", "", "The", "Such", "These", "Those", "Many"],
    
    title_pre: ["", "Forgotten", "New", "Old", "Quiet", "Curious", "Great", "First", "Second", "Main",
               "Small", "Final"],
    
    title_post: ["Tune", "Melody", "Lament", "Dawn", "Call", "Duty", "Way", "Air", "Étude", "Silence", 
                 "Path", "Zone", "Song", "Beginning", "Life", "Journey", "Wind", "Thought", "Sky"],
    title_post_plural: ["Wonders", "Days", "Duties", "Ways", "Paths", "Wings", "Voices",
                        "Beginnings", "Winds", "Thoughts", "Skies"],
    
    setting: ["A dense forest", "A bustling city", "An abandoned city", "The dark woods", "Outer space", 
             "A friendly town", "The deep ocean", "A medieval castle"],
    
    setting_detail: ["a boss theme", "a battle theme", "a rest area/save point theme", "a shop theme", 
                    "a chase scene theme", "the main theme for this area", "a suspense theme",
                    "a flashback theme", "a waltz", "a credits theme"],
    
    musical_detail: ["a key change/modulation", "a maximum of three instruments", "a simple, repeating melody",
                    "unpitched percussion", "a type of keys/piano", "pitched percussion", "a string quartet",
                    "an instrument solo", "a change in time signature", "only a few types of chords", 
                    "only 8-bit instruments", ],
    
    // combinations of mood words
    mood_detail: ["$negative, $negative, and $neutral", "$positive, $positive, and $neutral",
                 "$negative, $positive, and $neutral", "$neutral and $neutral", "$positive and $neutral",
                 "$negative and $neutral", "$positive and $negative", "$positive and $positive",
                 "$negative and $negative"],
    negative: ["sadness", "loneliness", "hostility", "emptiness", "wariness", "concern"],
    positive: ["love", "hope", "desire", "strength", "courage", "awe", "nostalgia", "care", "passion"],
    neutral: ["wandering", "curiosity", "mystery", "inspiration", "nostalgia"]
  };
  
  const template = `Track Name: $titles  
  
  Key: $key  
  
  Mode: $mode   
  
  Setting: $setting  
  
  Specifics:  
  - make $setting_detail  
  - must contain $musical_detail  
  - may evoke the feelings of $mood_detail  
  `;
  
  
  // STUDENTS: You don't need to edit code below this line.
  
  const slotPattern = /\$(\w+)/;
  
  function replacer(match, name) {
    let options = fillers[name];
    if (options) {
      return options[Math.floor(Math.random() * options.length)];
    } else {
      return `<UNKNOWN:${name}>`;
    }
  }
  
  function generate() {
    let story = template;
    while (story.match(slotPattern)) {
      story = story.replace(slotPattern, replacer);
    }
  
    /* global box */
    $("#box").text(story)
  }
  
  /* global clicker */
  $("#clicker").click(generate)
  
  generate();
  
}

// let's get this party started - uncomment me
main();
