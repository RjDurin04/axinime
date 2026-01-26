jikan anime api operations:

get
/anime/{id}/full

{
  "data": {
    "mal_id": 0,
    "url": "string",
    "images": {
      "jpg": {
        "image_url": "string",
        "small_image_url": "string",
        "large_image_url": "string"
      },
      "webp": {
        "image_url": "string",
        "small_image_url": "string",
        "large_image_url": "string"
      }
    },
    "trailer": {
      "youtube_id": "string",
      "url": "string",
      "embed_url": "string"
    },
    "approved": true,
    "titles": [
      {
        "type": "string",
        "title": "string"
      }
    ],
    "title": "string",
    "title_english": "string",
    "title_japanese": "string",
    "title_synonyms": [
      "string"
    ],
    "type": "TV",
    "source": "string",
    "episodes": 0,
    "status": "Finished Airing",
    "airing": true,
    "aired": {
      "from": "string",
      "to": "string",
      "prop": {
        "from": {
          "day": 0,
          "month": 0,
          "year": 0
        },
        "to": {
          "day": 0,
          "month": 0,
          "year": 0
        },
        "string": "string"
      }
    },
    "duration": "string",
    "rating": "G - All Ages",
    "score": 0.1,
    "scored_by": 0,
    "rank": 0,
    "popularity": 0,
    "members": 0,
    "favorites": 0,
    "synopsis": "string",
    "background": "string",
    "season": "summer",
    "year": 0,
    "broadcast": {
      "day": "string",
      "time": "string",
      "timezone": "string",
      "string": "string"
    },
    "producers": [
      {
        "mal_id": 0,
        "type": "string",
        "name": "string",
        "url": "string"
      }
    ],
    "licensors": [
      {
        "mal_id": 0,
        "type": "string",
        "name": "string",
        "url": "string"
      }
    ],
    "studios": [
      {
        "mal_id": 0,
        "type": "string",
        "name": "string",
        "url": "string"
      }
    ],
    "genres": [
      {
        "mal_id": 0,
        "type": "string",
        "name": "string",
        "url": "string"
      }
    ],
    "explicit_genres": [
      {
        "mal_id": 0,
        "type": "string",
        "name": "string",
        "url": "string"
      }
    ],
    "themes": [
      {
        "mal_id": 0,
        "type": "string",
        "name": "string",
        "url": "string"
      }
    ],
    "demographics": [
      {
        "mal_id": 0,
        "type": "string",
        "name": "string",
        "url": "string"
      }
    ],
    "relations": [
      {
        "relation": "string",
        "entry": [
          {
            "mal_id": 0,
            "type": "string",
            "name": "string",
            "url": "string"
          }
        ]
      }
    ],
    "theme": {
      "openings": [
        "string"
      ],
      "endings": [
        "string"
      ]
    },
    "external": [
      {
        "name": "string",
        "url": "string"
      }
    ],
    "streaming": [
      {
        "name": "string",
        "url": "string"
      }
    ]
  }
}


get
/anime/{id}

{
  "data": {
    "mal_id": 0,
    "url": "string",
    "images": {
      "jpg": {
        "image_url": "string",
        "small_image_url": "string",
        "large_image_url": "string"
      },
      "webp": {
        "image_url": "string",
        "small_image_url": "string",
        "large_image_url": "string"
      }
    },
    "trailer": {
      "youtube_id": "string",
      "url": "string",
      "embed_url": "string"
    },
    "approved": true,
    "titles": [
      {
        "type": "string",
        "title": "string"
      }
    ],
    "title": "string",
    "title_english": "string",
    "title_japanese": "string",
    "title_synonyms": [
      "string"
    ],
    "type": "TV",
    "source": "string",
    "episodes": 0,
    "status": "Finished Airing",
    "airing": true,
    "aired": {
      "from": "string",
      "to": "string",
      "prop": {
        "from": {
          "day": 0,
          "month": 0,
          "year": 0
        },
        "to": {
          "day": 0,
          "month": 0,
          "year": 0
        },
        "string": "string"
      }
    },
    "duration": "string",
    "rating": "G - All Ages",
    "score": 0.1,
    "scored_by": 0,
    "rank": 0,
    "popularity": 0,
    "members": 0,
    "favorites": 0,
    "synopsis": "string",
    "background": "string",
    "season": "summer",
    "year": 0,
    "broadcast": {
      "day": "string",
      "time": "string",
      "timezone": "string",
      "string": "string"
    },
    "producers": [
      {
        "mal_id": 0,
        "type": "string",
        "name": "string",
        "url": "string"
      }
    ],
    "licensors": [
      {
        "mal_id": 0,
        "type": "string",
        "name": "string",
        "url": "string"
      }
    ],
    "studios": [
      {
        "mal_id": 0,
        "type": "string",
        "name": "string",
        "url": "string"
      }
    ],
    "genres": [
      {
        "mal_id": 0,
        "type": "string",
        "name": "string",
        "url": "string"
      }
    ],
    "explicit_genres": [
      {
        "mal_id": 0,
        "type": "string",
        "name": "string",
        "url": "string"
      }
    ],
    "themes": [
      {
        "mal_id": 0,
        "type": "string",
        "name": "string",
        "url": "string"
      }
    ],
    "demographics": [
      {
        "mal_id": 0,
        "type": "string",
        "name": "string",
        "url": "string"
      }
    ]
  }
}

get
/anime/{id}/characters

{
  "data": [
    {
      "character": {
        "mal_id": 0,
        "url": "string",
        "images": {
          "jpg": {
            "image_url": "string",
            "small_image_url": "string"
          },
          "webp": {
            "image_url": "string",
            "small_image_url": "string"
          }
        },
        "name": "string"
      },
      "role": "string",
      "voice_actors": [
        {
          "person": {
            "mal_id": 0,
            "url": "string",
            "images": {
              "jpg": {}
            },
            "name": "string"
          },
          "language": "string"
        }
      ]
    }
  ]
}

get
/anime/{id}/staff

{
  "data": [
    {
      "person": {
        "mal_id": 0,
        "url": "string",
        "images": {
          "jpg": {
            "image_url": "string"
          }
        },
        "name": "string"
      },
      "positions": [
        "string"
      ]
    }
  ]
}

get
/anime/{id}/episodes

{
  "data": [
    {
      "mal_id": 0,
      "url": "string",
      "title": "string",
      "title_japanese": "string",
      "title_romanji": "string",
      "aired": "string",
      "score": null,
      "filler": true,
      "recap": true,
      "forum_url": "string"
    }
  ],
  "pagination": {
    "last_visible_page": 0,
    "has_next_page": true
  }
}

get
/anime/{id}/episodes/{episode}

{
  "data": {
    "mal_id": 0,
    "url": "string",
    "title": "string",
    "title_japanese": "string",
    "title_romanji": "string",
    "duration": 0,
    "aired": "string",
    "filler": true,
    "recap": true,
    "synopsis": "string"
  }
}

get
/anime/{id}/news

{
  "pagination": {
    "last_visible_page": 0,
    "has_next_page": true
  },
  "data": [
    {
      "mal_id": 0,
      "url": "string",
      "title": "string",
      "date": "string",
      "author_username": "string",
      "author_url": "string",
      "forum_url": "string",
      "images": {
        "jpg": {
          "image_url": "string"
        }
      },
      "comments": 0,
      "excerpt": "string"
    }
  ]
}

get
/anime/{id}/forum

{
  "data": [
    {
      "mal_id": 0,
      "url": "string",
      "title": "string",
      "date": "string",
      "author_username": "string",
      "author_url": "string",
      "comments": 0,
      "last_comment": {
        "url": "string",
        "author_username": "string",
        "author_url": "string",
        "date": "string"
      }
    }
  ]
}

get
/anime/{id}/videos

{
  "data": {
    "promo": [
      {
        "title": "string",
        "trailer": {
          "youtube_id": "string",
          "url": "string",
          "embed_url": "string",
          "images": {
            "image_url": "string",
            "small_image_url": "string",
            "medium_image_url": "string",
            "large_image_url": "string",
            "maximum_image_url": "string"
          }
        }
      }
    ],
    "episodes": [
      {
        "mal_id": 0,
        "url": "string",
        "title": "string",
        "episode": "string",
        "images": {
          "jpg": {
            "image_url": "string"
          }
        }
      }
    ],
    "music_videos": [
      {
        "title": "string",
        "video": {
          "youtube_id": "string",
          "url": "string",
          "embed_url": "string",
          "images": {
            "image_url": "string",
            "small_image_url": "string",
            "medium_image_url": "string",
            "large_image_url": "string",
            "maximum_image_url": "string"
          }
        },
        "meta": {
          "title": "string",
          "author": "string"
        }
      }
    ]
  }
}

get
/anime/{id}/videos/episodes

{
  "data": [
    {
      "mal_id": 0,
      "title": "string",
      "episode": "string",
      "url": "string",
      "images": {
        "jpg": {
          "image_url": "string"
        }
      }
    }
  ],
  "pagination": {
    "last_visible_page": 0,
    "has_next_page": true
  }
}

get
/anime/{id}/pictures

{
  "data": [
    {
      "images": {
        "jpg": {
          "image_url": "string"
        }
      }
    }
  ]
}

get
/anime/{id}/statistics

{
  "data": {
    "watching": 0,
    "completed": 0,
    "on_hold": 0,
    "dropped": 0,
    "plan_to_watch": 0,
    "total": 0,
    "scores": [
      {
        "score": 0,
        "votes": 0,
        "percentage": 0.1
      }
    ]
  }
}

get
/anime/{id}/moreinfo

{
  "data": {
    "moreinfo": "string"
  }
}

get
/anime/{id}/recommendations

{
  "data": [
    {
      "entry": {
        "mal_id": 0,
        "url": "string",
        "images": {
          "jpg": {
            "image_url": "string",
            "small_image_url": "string",
            "large_image_url": "string"
          },
          "webp": {
            "image_url": "string",
            "small_image_url": "string",
            "large_image_url": "string"
          }
        },
        "title": "string"
      }
    }
  ]
}


get
/anime/{id}/userupdates

{
  "data": [
    {
      "user": {
        "username": "string",
        "url": "string",
        "images": {
          "jpg": {
            "image_url": "string"
          },
          "webp": {
            "image_url": "string"
          }
        }
      },
      "score": 0,
      "status": "string",
      "episodes_seen": 0,
      "episodes_total": 0,
      "date": "string"
    }
  ],
  "pagination": {
    "last_visible_page": 0,
    "has_next_page": true
  }
}

get
/anime/{id}/reviews

{
  "data": [
    {
      "user": {
        "username": "string",
        "url": "string",
        "images": {
          "jpg": {
            "image_url": "string"
          },
          "webp": {
            "image_url": "string"
          }
        }
      },
      "mal_id": 0,
      "url": "string",
      "type": "string",
      "reactions": {
        "overall": 0,
        "nice": 0,
        "love_it": 0,
        "funny": 0,
        "confusing": 0,
        "informative": 0,
        "well_written": 0,
        "creative": 0
      },
      "date": "string",
      "review": "string",
      "score": 0,
      "tags": [
        "string"
      ],
      "is_spoiler": true,
      "is_preliminary": true,
      "episodes_watched": 0
    }
  ],
  "pagination": {
    "last_visible_page": 0,
    "has_next_page": true
  }
}

get
/anime/{id}/relations

{
  "data": [
    {
      "relation": "string",
      "entry": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ]
    }
  ]
}


get
/anime/{id}/themes

{
  "data": {
    "openings": [
      "string"
    ],
    "endings": [
      "string"
    ]
  }
}

get
/anime/{id}/external

{
  "data": [
    {
      "name": "string",
      "url": "string"
    }
  ]
}

get
/anime/{id}/streaming

{
  "data": [
    {
      "name": "string",
      "url": "string"
    }
  ]
}

get
/genres/anime

{
  "data": [
    {
      "mal_id": 0,
      "name": "string",
      "url": "string",
      "count": 0
    }
  ]
}

get
/reviews/anime

null

get
/schedules

{
  "data": [
    {
      "mal_id": 0,
      "url": "string",
      "images": {
        "jpg": {
          "image_url": "string",
          "small_image_url": "string",
          "large_image_url": "string"
        },
        "webp": {
          "image_url": "string",
          "small_image_url": "string",
          "large_image_url": "string"
        }
      },
      "trailer": {
        "youtube_id": "string",
        "url": "string",
        "embed_url": "string"
      },
      "approved": true,
      "titles": [
        {
          "type": "string",
          "title": "string"
        }
      ],
      "title": "string",
      "title_english": "string",
      "title_japanese": "string",
      "title_synonyms": [
        "string"
      ],
      "type": "TV",
      "source": "string",
      "episodes": 0,
      "status": "Finished Airing",
      "airing": true,
      "aired": {
        "from": "string",
        "to": "string",
        "prop": {
          "from": {
            "day": 0,
            "month": 0,
            "year": 0
          },
          "to": {
            "day": 0,
            "month": 0,
            "year": 0
          },
          "string": "string"
        }
      },
      "duration": "string",
      "rating": "G - All Ages",
      "score": 0.1,
      "scored_by": 0,
      "rank": 0,
      "popularity": 0,
      "members": 0,
      "favorites": 0,
      "synopsis": "string",
      "background": "string",
      "season": "summer",
      "year": 0,
      "broadcast": {
        "day": "string",
        "time": "string",
        "timezone": "string",
        "string": "string"
      },
      "producers": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ],
      "licensors": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ],
      "studios": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ],
      "genres": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ],
      "explicit_genres": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ],
      "themes": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ],
      "demographics": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ]
    }
  ],
  "pagination": {
    "last_visible_page": 0,
    "has_next_page": true,
    "current_page": 0,
    "items": {
      "count": 0,
      "total": 0,
      "per_page": 0
    }
  }
}

get
/top/anime

{
  "data": [
    {
      "mal_id": 0,
      "url": "string",
      "images": {
        "jpg": {
          "image_url": "string",
          "small_image_url": "string",
          "large_image_url": "string"
        },
        "webp": {
          "image_url": "string",
          "small_image_url": "string",
          "large_image_url": "string"
        }
      },
      "trailer": {
        "youtube_id": "string",
        "url": "string",
        "embed_url": "string"
      },
      "approved": true,
      "titles": [
        {
          "type": "string",
          "title": "string"
        }
      ],
      "title": "string",
      "title_english": "string",
      "title_japanese": "string",
      "title_synonyms": [
        "string"
      ],
      "type": "TV",
      "source": "string",
      "episodes": 0,
      "status": "Finished Airing",
      "airing": true,
      "aired": {
        "from": "string",
        "to": "string",
        "prop": {
          "from": {
            "day": 0,
            "month": 0,
            "year": 0
          },
          "to": {
            "day": 0,
            "month": 0,
            "year": 0
          },
          "string": "string"
        }
      },
      "duration": "string",
      "rating": "G - All Ages",
      "score": 0.1,
      "scored_by": 0,
      "rank": 0,
      "popularity": 0,
      "members": 0,
      "favorites": 0,
      "synopsis": "string",
      "background": "string",
      "season": "summer",
      "year": 0,
      "broadcast": {
        "day": "string",
        "time": "string",
        "timezone": "string",
        "string": "string"
      },
      "producers": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ],
      "licensors": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ],
      "studios": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ],
      "genres": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ],
      "explicit_genres": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ],
      "themes": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ],
      "demographics": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ]
    }
  ],
  "pagination": {
    "last_visible_page": 0,
    "has_next_page": true,
    "current_page": 0,
    "items": {
      "count": 0,
      "total": 0,
      "per_page": 0
    }
  }
}


get
/top/reviews

{
  "data": {
    "data": [
      {
        "user": {
          "username": "string",
          "url": "string",
          "images": {
            "jpg": {
              "image_url": "string"
            },
            "webp": {
              "image_url": "string"
            }
          }
        },
        "anime": {
          "mal_id": 0,
          "url": "string",
          "images": {
            "jpg": {
              "image_url": "string",
              "small_image_url": "string",
              "large_image_url": "string"
            },
            "webp": {
              "image_url": "string",
              "small_image_url": "string",
              "large_image_url": "string"
            }
          },
          "title": "string"
        },
        "mal_id": 0,
        "url": "string",
        "type": "string",
        "reactions": {
          "overall": 0,
          "nice": 0,
          "love_it": 0,
          "funny": 0,
          "confusing": 0,
          "informative": 0,
          "well_written": 0,
          "creative": 0
        },
        "date": "string",
        "review": "string",
        "score": 0,
        "tags": [
          "string"
        ],
        "is_spoiler": true,
        "is_preliminary": true,
        "episodes_watched": 0
      }
    ],
    "pagination": {
      "last_visible_page": 0,
      "has_next_page": true
    }
  }
}

get
/seasons/now

{
  "data": [
    {
      "mal_id": 0,
      "url": "string",
      "images": {
        "jpg": {
          "image_url": "string",
          "small_image_url": "string",
          "large_image_url": "string"
        },
        "webp": {
          "image_url": "string",
          "small_image_url": "string",
          "large_image_url": "string"
        }
      },
      "trailer": {
        "youtube_id": "string",
        "url": "string",
        "embed_url": "string"
      },
      "approved": true,
      "titles": [
        {
          "type": "string",
          "title": "string"
        }
      ],
      "title": "string",
      "title_english": "string",
      "title_japanese": "string",
      "title_synonyms": [
        "string"
      ],
      "type": "TV",
      "source": "string",
      "episodes": 0,
      "status": "Finished Airing",
      "airing": true,
      "aired": {
        "from": "string",
        "to": "string",
        "prop": {
          "from": {
            "day": 0,
            "month": 0,
            "year": 0
          },
          "to": {
            "day": 0,
            "month": 0,
            "year": 0
          },
          "string": "string"
        }
      },
      "duration": "string",
      "rating": "G - All Ages",
      "score": 0.1,
      "scored_by": 0,
      "rank": 0,
      "popularity": 0,
      "members": 0,
      "favorites": 0,
      "synopsis": "string",
      "background": "string",
      "season": "summer",
      "year": 0,
      "broadcast": {
        "day": "string",
        "time": "string",
        "timezone": "string",
        "string": "string"
      },
      "producers": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ],
      "licensors": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ],
      "studios": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ],
      "genres": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ],
      "explicit_genres": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ],
      "themes": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ],
      "demographics": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ]
    }
  ],
  "pagination": {
    "last_visible_page": 0,
    "has_next_page": true,
    "current_page": 0,
    "items": {
      "count": 0,
      "total": 0,
      "per_page": 0
    }
  }
}

get
/seasons/{year}/{season}

{
  "data": [
    {
      "mal_id": 0,
      "url": "string",
      "images": {
        "jpg": {
          "image_url": "string",
          "small_image_url": "string",
          "large_image_url": "string"
        },
        "webp": {
          "image_url": "string",
          "small_image_url": "string",
          "large_image_url": "string"
        }
      },
      "trailer": {
        "youtube_id": "string",
        "url": "string",
        "embed_url": "string"
      },
      "approved": true,
      "titles": [
        {
          "type": "string",
          "title": "string"
        }
      ],
      "title": "string",
      "title_english": "string",
      "title_japanese": "string",
      "title_synonyms": [
        "string"
      ],
      "type": "TV",
      "source": "string",
      "episodes": 0,
      "status": "Finished Airing",
      "airing": true,
      "aired": {
        "from": "string",
        "to": "string",
        "prop": {
          "from": {
            "day": 0,
            "month": 0,
            "year": 0
          },
          "to": {
            "day": 0,
            "month": 0,
            "year": 0
          },
          "string": "string"
        }
      },
      "duration": "string",
      "rating": "G - All Ages",
      "score": 0.1,
      "scored_by": 0,
      "rank": 0,
      "popularity": 0,
      "members": 0,
      "favorites": 0,
      "synopsis": "string",
      "background": "string",
      "season": "summer",
      "year": 0,
      "broadcast": {
        "day": "string",
        "time": "string",
        "timezone": "string",
        "string": "string"
      },
      "producers": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ],
      "licensors": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ],
      "studios": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ],
      "genres": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ],
      "explicit_genres": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ],
      "themes": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ],
      "demographics": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ]
    }
  ],
  "pagination": {
    "last_visible_page": 0,
    "has_next_page": true,
    "current_page": 0,
    "items": {
      "count": 0,
      "total": 0,
      "per_page": 0
    }
  }
}

get
/seasons

{
  "data": [
    {
      "year": 0,
      "seasons": [
        "string"
      ]
    }
  ]
}

get
/seasons/upcoming

{
  "data": [
    {
      "mal_id": 0,
      "url": "string",
      "images": {
        "jpg": {
          "image_url": "string",
          "small_image_url": "string",
          "large_image_url": "string"
        },
        "webp": {
          "image_url": "string",
          "small_image_url": "string",
          "large_image_url": "string"
        }
      },
      "trailer": {
        "youtube_id": "string",
        "url": "string",
        "embed_url": "string"
      },
      "approved": true,
      "titles": [
        {
          "type": "string",
          "title": "string"
        }
      ],
      "title": "string",
      "title_english": "string",
      "title_japanese": "string",
      "title_synonyms": [
        "string"
      ],
      "type": "TV",
      "source": "string",
      "episodes": 0,
      "status": "Finished Airing",
      "airing": true,
      "aired": {
        "from": "string",
        "to": "string",
        "prop": {
          "from": {
            "day": 0,
            "month": 0,
            "year": 0
          },
          "to": {
            "day": 0,
            "month": 0,
            "year": 0
          },
          "string": "string"
        }
      },
      "duration": "string",
      "rating": "G - All Ages",
      "score": 0.1,
      "scored_by": 0,
      "rank": 0,
      "popularity": 0,
      "members": 0,
      "favorites": 0,
      "synopsis": "string",
      "background": "string",
      "season": "summer",
      "year": 0,
      "broadcast": {
        "day": "string",
        "time": "string",
        "timezone": "string",
        "string": "string"
      },
      "producers": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ],
      "licensors": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ],
      "studios": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ],
      "genres": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ],
      "explicit_genres": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ],
      "themes": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ],
      "demographics": [
        {
          "mal_id": 0,
          "type": "string",
          "name": "string",
          "url": "string"
        }
      ]
    }
  ],
  "pagination": {
    "last_visible_page": 0,
    "has_next_page": true,
    "current_page": 0,
    "items": {
      "count": 0,
      "total": 0,
      "per_page": 0
    }
  }
}

get
/watch/episodes

{
  "data": [
    {
      "entry": {
        "mal_id": 0,
        "url": "string",
        "images": {
          "jpg": {
            "image_url": "string",
            "small_image_url": "string",
            "large_image_url": "string"
          },
          "webp": {
            "image_url": "string",
            "small_image_url": "string",
            "large_image_url": "string"
          }
        },
        "title": "string"
      },
      "episodes": [
        {
          "mal_id": "string",
          "url": "string",
          "title": "string",
          "premium": true
        }
      ],
      "region_locked": true
    }
  ],
  "pagination": {
    "last_visible_page": 0,
    "has_next_page": true
  }
}

get
/watch/episodes/popular

{
  "data": [
    {
      "entry": {
        "mal_id": 0,
        "url": "string",
        "images": {
          "jpg": {
            "image_url": "string",
            "small_image_url": "string",
            "large_image_url": "string"
          },
          "webp": {
            "image_url": "string",
            "small_image_url": "string",
            "large_image_url": "string"
          }
        },
        "title": "string"
      },
      "episodes": [
        {
          "mal_id": "string",
          "url": "string",
          "title": "string",
          "premium": true
        }
      ],
      "region_locked": true
    }
  ],
  "pagination": {
    "last_visible_page": 0,
    "has_next_page": true
  }
}

get
/recommendations/anime

{
  "data": [
    {
      "mal_id": "string",
      "entry": [
        {
          "mal_id": 0,
          "url": "string",
          "images": {
            "jpg": {
              "image_url": "string",
              "small_image_url": "string",
              "large_image_url": "string"
            },
            "webp": {
              "image_url": "string",
              "small_image_url": "string",
              "large_image_url": "string"
            }
          },
          "title": "string"
        }
      ],
      "content": "string",
      "user": {
        "url": "string",
        "username": "string"
      }
    }
  ],
  "pagination": {
    "last_visible_page": 0,
    "has_next_page": true
  }
}


get
/characters/{id}/full

{
  "data": {
    "mal_id": 0,
    "url": "string",
    "images": {
      "jpg": {
        "image_url": "string",
        "small_image_url": "string"
      },
      "webp": {
        "image_url": "string",
        "small_image_url": "string"
      }
    },
    "name": "string",
    "name_kanji": "string",
    "nicknames": [
      "string"
    ],
    "favorites": 0,
    "about": "string",
    "anime": [
      {
        "role": "string",
        "anime": {
          "mal_id": 0,
          "url": "string",
          "images": {
            "jpg": {
              "image_url": "string",
              "small_image_url": "string",
              "large_image_url": "string"
            },
            "webp": {
              "image_url": "string",
              "small_image_url": "string",
              "large_image_url": "string"
            }
          },
          "title": "string"
        }
      }
    ],
    "manga": [
      {
        "role": "string",
        "manga": {
          "mal_id": 0,
          "url": "string",
          "images": {
            "jpg": {
              "image_url": "string",
              "small_image_url": "string",
              "large_image_url": "string"
            },
            "webp": {
              "image_url": "string",
              "small_image_url": "string",
              "large_image_url": "string"
            }
          },
          "title": "string"
        }
      }
    ],
    "voices": [
      {
        "language": "string",
        "person": {
          "mal_id": 0,
          "url": "string",
          "images": {
            "jpg": {
              "image_url": "string"
            }
          },
          "name": "string"
        }
      }
    ]
  }
}


get
/characters/{id}

{
  "data": {
    "mal_id": 0,
    "url": "string",
    "images": {
      "jpg": {
        "image_url": "string",
        "small_image_url": "string"
      },
      "webp": {
        "image_url": "string",
        "small_image_url": "string"
      }
    },
    "name": "string",
    "name_kanji": "string",
    "nicknames": [
      "string"
    ],
    "favorites": 0,
    "about": "string"
  }
}

get
/characters/{id}/anime

{
  "data": [
    {
      "role": "string",
      "anime": {
        "mal_id": 0,
        "url": "string",
        "images": {
          "jpg": {
            "image_url": "string",
            "small_image_url": "string",
            "large_image_url": "string"
          },
          "webp": {
            "image_url": "string",
            "small_image_url": "string",
            "large_image_url": "string"
          }
        },
        "title": "string"
      }
    }
  ]
}

get
/characters/{id}/voices

{
  "data": [
    {
      "language": "string",
      "person": {
        "mal_id": 0,
        "url": "string",
        "images": {
          "jpg": {
            "image_url": "string"
          }
        },
        "name": "string"
      }
    }
  ]
}

get
/characters/{id}/pictures

{
  "data": [
    {
      "language": "string",
      "person": {
        "mal_id": 0,
        "url": "string",
        "images": {
          "jpg": {
            "image_url": "string"
          }
        },
        "name": "string"
      }
    }
  ]
}

get
/characters

{
  "data": [
    {
      "mal_id": 0,
      "url": "string",
      "images": {
        "jpg": {
          "image_url": "string",
          "small_image_url": "string"
        },
        "webp": {
          "image_url": "string",
          "small_image_url": "string"
        }
      },
      "name": "string",
      "name_kanji": "string",
      "nicknames": [
        "string"
      ],
      "favorites": 0,
      "about": "string"
    }
  ],
  "pagination": {
    "last_visible_page": 0,
    "has_next_page": true,
    "current_page": 0,
    "items": {
      "count": 0,
      "total": 0,
      "per_page": 0
    }
  }
}







get
/people/{id}/full

{
  "data": {
    "mal_id": 0,
    "url": "string",
    "website_url": "string",
    "images": {
      "jpg": {
        "image_url": "string"
      }
    },
    "name": "string",
    "given_name": "string",
    "family_name": "string",
    "alternate_names": [
      "string"
    ],
    "birthday": "string",
    "favorites": 0,
    "about": "string",
    "anime": [
      {
        "position": "string",
        "anime": {
          "mal_id": 0,
          "url": "string",
          "images": {
            "jpg": {
              "image_url": "string",
              "small_image_url": "string",
              "large_image_url": "string"
            },
            "webp": {
              "image_url": "string",
              "small_image_url": "string",
              "large_image_url": "string"
            }
          },
          "title": "string"
        }
      }
    ],
    "manga": [
      {
        "position": "string",
        "manga": {
          "mal_id": 0,
          "url": "string",
          "images": {
            "jpg": {
              "image_url": "string",
              "small_image_url": "string",
              "large_image_url": "string"
            },
            "webp": {
              "image_url": "string",
              "small_image_url": "string",
              "large_image_url": "string"
            }
          },
          "title": "string"
        }
      }
    ],
    "voices": [
      {
        "role": "string",
        "anime": {
          "mal_id": 0,
          "url": "string",
          "images": {
            "jpg": {
              "image_url": "string",
              "small_image_url": "string",
              "large_image_url": "string"
            },
            "webp": {
              "image_url": "string",
              "small_image_url": "string",
              "large_image_url": "string"
            }
          },
          "title": "string"
        },
        "character": {
          "mal_id": 0,
          "url": "string",
          "images": {
            "jpg": {
              "image_url": "string",
              "small_image_url": "string"
            },
            "webp": {
              "image_url": "string",
              "small_image_url": "string"
            }
          },
          "name": "string"
        }
      }
    ]
  }
}

get
/people/{id}

{
  "data": {
    "mal_id": 0,
    "url": "string",
    "website_url": "string",
    "images": {
      "jpg": {
        "image_url": "string"
      }
    },
    "name": "string",
    "given_name": "string",
    "family_name": "string",
    "alternate_names": [
      "string"
    ],
    "birthday": "string",
    "favorites": 0,
    "about": "string"
  }
}


get
/people/{id}/anime

{
  "data": [
    {
      "position": "string",
      "anime": {
        "mal_id": 0,
        "url": "string",
        "images": {
          "jpg": {
            "image_url": "string",
            "small_image_url": "string",
            "large_image_url": "string"
          },
          "webp": {
            "image_url": "string",
            "small_image_url": "string",
            "large_image_url": "string"
          }
        },
        "title": "string"
      }
    }
  ]
}

get
/people/{id}/voices


{
  "data": [
    {
      "role": "string",
      "anime": {
        "mal_id": 0,
        "url": "string",
        "images": {
          "jpg": {
            "image_url": "string",
            "small_image_url": "string",
            "large_image_url": "string"
          },
          "webp": {
            "image_url": "string",
            "small_image_url": "string",
            "large_image_url": "string"
          }
        },
        "title": "string"
      },
      "character": {
        "mal_id": 0,
        "url": "string",
        "images": {
          "jpg": {
            "image_url": "string",
            "small_image_url": "string"
          },
          "webp": {
            "image_url": "string",
            "small_image_url": "string"
          }
        },
        "name": "string"
      }
    }
  ]
}

get
/people/{id}/pictures

{
  "data": [
    {
      "jpg": {
        "image_url": "string"
      }
    }
  ]
}

get
/people

{
  "data": [
    {
      "mal_id": 0,
      "url": "string",
      "website_url": "string",
      "images": {
        "jpg": {
          "image_url": "string"
        }
      },
      "name": "string",
      "given_name": "string",
      "family_name": "string",
      "alternate_names": [
        "string"
      ],
      "birthday": "string",
      "favorites": 0,
      "about": "string"
    }
  ],
  "pagination": {
    "last_visible_page": 0,
    "has_next_page": true,
    "current_page": 0,
    "items": {
      "count": 0,
      "total": 0,
      "per_page": 0
    }
  }
}

get
/people/{id}/manga

{
  "data": [
    {
      "position": "string",
      "manga": {
        "mal_id": 0,
        "url": "string",
        "images": {
          "jpg": {
            "image_url": "string",
            "small_image_url": "string",
            "large_image_url": "string"
          },
          "webp": {
            "image_url": "string",
            "small_image_url": "string",
            "large_image_url": "string"
          }
        },
        "title": "string"
      }
    }
  ]
}