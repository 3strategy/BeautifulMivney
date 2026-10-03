צרו **BookAdapter.java** במיקום המתואר בשיעור. זהו קובץ חדש, ולכן הקוד מוצג במלואו.

```java
package com.example.topics;

import android.view.LayoutInflater;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.DiffUtil;
import androidx.recyclerview.widget.ListAdapter;
import androidx.recyclerview.widget.RecyclerView;

import com.example.topics.databinding.RowBookBinding;
import com.example.topics.databinding.RowHeaderBinding;

import java.util.ArrayList;
import java.util.List;

/** Binds two view types and delegates actions by book ID. */
public final class BookAdapter extends ListAdapter<BookRow, RecyclerView.ViewHolder> {
    public interface OnFavoriteClick {
        /**
         * Requests a model change for a stable identity.
         *
         * @param bookId clicked book ID, never a saved adapter position
         */
        void onFavoriteClick(int bookId);
    }

    private static final DiffUtil.ItemCallback<BookRow> DIFF = new DiffUtil.ItemCallback<>() {
        /**
         * Compares logical row identity independently of displayed content.
         *
         * @param oldItem row in the previous list
         * @param newItem row in the incoming list
         * @return true for the same type and stable ID
         */
        @Override
        public boolean areItemsTheSame(@NonNull BookRow oldItem, @NonNull BookRow newItem) {
            return oldItem.type == newItem.type && oldItem.id == newItem.id;
        }

        /**
         * Checks every visible field to decide whether an identified row needs rebinding.
         *
         * @param oldItem previous visible data
         * @param newItem incoming visible data
         * @return true when title and favorite state match
         */
        @Override
        public boolean areContentsTheSame(@NonNull BookRow oldItem, @NonNull BookRow newItem) {
            return oldItem.favorite == newItem.favorite && oldItem.title.equals(newItem.title);
        }
    };

    private final OnFavoriteClick onFavoriteClick;

    /**
     * Configures diffing and stable identities while keeping state changes outside the adapter.
     *
     * @param onFavoriteClick callback receiving a stable book ID
     */
    public BookAdapter(OnFavoriteClick onFavoriteClick) {
        super(DIFF);
        this.onFavoriteClick = onFavoriteClick;
        setHasStableIds(true);
    }

    /**
     * Creates a fresh row snapshot; an empty shelf has no header.
     *
     * @param books immutable book data from the current screen state
     * @param heading localized section title
     */
    public void submitBooks(Book[] books, String heading) {
        List<BookRow> rows = new ArrayList<>();
        if (books.length > 0) rows.add(BookRow.header(heading));
        for (Book book : books) rows.add(BookRow.book(book));
        // Never mutate an earlier submitted list; DiffUtil needs both snapshots.
        submitList(rows);
    }

    /**
     * Returns stable identity rather than the item's current list position.
     *
     * @param position current adapter position
     * @return the row's stable ID
     */
    @Override
    public long getItemId(int position) {
        return getItem(position).id;
    }

    /**
     * Selects the layout family from row data.
     *
     * @param position current adapter position
     * @return HEADER or BOOK
     */
    @Override
    public int getItemViewType(int position) {
        return getItem(position).type;
    }

    /**
     * Creates the matching row View; the RecyclerView attaches it later.
     *
     * @param parent RecyclerView supplying theme and layout parameters
     * @param viewType required layout family
     * @return holder owning only the corresponding row binding
     */
    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(parent.getContext());
        if (viewType == BookRow.HEADER) {
            return new HeaderHolder(RowHeaderBinding.inflate(inflater, parent, false));
        }
        return new BookHolder(RowBookBinding.inflate(inflater, parent, false));
    }

    /**
     * Overwrites visible state and click targets for the row now occupying this View.
     *
     * @param holder possibly recycled holder, matching the row type
     * @param position current row position used to obtain immutable row data
     */
    @Override
    public void onBindViewHolder(@NonNull RecyclerView.ViewHolder holder, int position) {
        BookRow row = getItem(position);
        if (holder instanceof HeaderHolder) {
            ((HeaderHolder) holder).binding.headerTitle.setText(row.title);
        } else {
            BookHolder bookHolder = (BookHolder) holder;
            bookHolder.binding.bookTitle.setText(row.title);
            // Always set both states; a recycled row may have shown a different book.
            bookHolder.binding.favorite.setText(row.favorite
                    ? R.string.favorite_on : R.string.favorite_off);
            bookHolder.binding.favorite.setOnClickListener(v -> onFavoriteClick.onFavoriteClick((int) row.id));
            bookHolder.binding.getRoot().setOnClickListener(v -> onFavoriteClick.onFavoriteClick((int) row.id));
        }
    }

    private static final class HeaderHolder extends RecyclerView.ViewHolder {
        final RowHeaderBinding binding;

        /**
         * Owns a header View binding without owning any book state.
         *
         * @param binding newly inflated header View tree
         */
        HeaderHolder(RowHeaderBinding binding) {
            super(binding.getRoot());
            this.binding = binding;
        }
    }

    private static final class BookHolder extends RecyclerView.ViewHolder {
        final RowBookBinding binding;

        /**
         * Owns a reusable book View binding without owning the favorite truth.
         *
         * @param binding newly inflated book row View tree
         */
        BookHolder(RowBookBinding binding) {
            super(binding.getRoot());
            this.binding = binding;
        }
    }
}
```

