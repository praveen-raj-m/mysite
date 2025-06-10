Perfect. Based on your update:

### 🔄 Updated Requirements:

* The **child grid appears only when a parent row is double-clicked**.
* It **should be collapsible**, i.e., have a **close button** to hide it.
* The **rest of the logic remains**: split total amount using percentages, dynamic rows, save only if total percentage is 100%.

---

## ✅ Key Changes to Implement:

1. **Trigger child grid visibility on double-click.**
2. **Add a boolean `IsChildVisible`** in the `ViewModel`.
3. **Bind child section visibility to `IsChildVisible`.**
4. **Add a close button to hide the child grid.**

---

## 🧠 ViewModel Changes (`MainViewModel.cs`)

Add the `IsChildVisible` property and `CloseChildCommand`:

```csharp
private bool isChildVisible;
public bool IsChildVisible
{
    get => isChildVisible;
    set
    {
        isChildVisible = value;
        OnPropertyChanged();
    }
}

public ICommand ShowChildCommand { get; }
public ICommand CloseChildCommand { get; }

public MainViewModel()
{
    // Existing...
    ShowChildCommand = new RelayCommand<ParentItem>(ShowChildGrid);
    CloseChildCommand = new RelayCommand(() => IsChildVisible = false);
}

private void ShowChildGrid(ParentItem parent)
{
    SelectedParent = parent;
    LoadChildItems();
    IsChildVisible = true;
}
```

---

## 🖼️ XAML Changes (`MainWindow.xaml`)

### 1. Add Double-Click Event to Parent Grid

Replace the GridControl section for parent with:

```xml
<dxg:GridControl Grid.Row="0" ItemsSource="{Binding ParentItems}">
    <dxg:GridControl.View>
        <dxg:TableView ShowGroupPanel="False"
                       AllowEditing="False"
                       AutoWidth="True"
                       RowDoubleClick="ParentGrid_RowDoubleClick"/>
    </dxg:GridControl.View>
</dxg:GridControl>
```

### 2. Code-Behind to Handle Double-Click (`MainWindow.xaml.cs`)

```csharp
private void ParentGrid_RowDoubleClick(object sender, DevExpress.Xpf.Grid.RowDoubleClickEventArgs e)
{
    if (e.Row != null && DataContext is MainViewModel vm && e.Row is ParentItem parent)
    {
        vm.ShowChildCommand.Execute(parent);
    }
}
```

---

### 3. Bind Child Grid to `IsChildVisible`

Wrap child section in a `Border` with `Visibility` bound to `IsChildVisible`:

```xml
<Border Grid.Row="1" Padding="10"
        Background="#f2f2f2"
        Visibility="{Binding IsChildVisible, Converter={StaticResource BoolToVisibilityConverter}}">
    <DockPanel>
        <!-- Close Button -->
        <Button Content="✖" DockPanel.Dock="Top" Width="25" Height="25"
                HorizontalAlignment="Right"
                Command="{Binding CloseChildCommand}"/>

        <!-- Child Grid -->
        <dxg:GridControl ItemsSource="{Binding ChildItems}" Margin="0,10,0,10">
            <dxg:GridControl.View>
                <dxg:TableView ShowGroupPanel="False" />
            </dxg:GridControl.View>

            <dxg:GridColumn FieldName="Category1" Header="List 1"/>
            <dxg:GridColumn FieldName="Category2" Header="List 2"/>
            <dxg:GridColumn FieldName="Category3" Header="List 3"/>
            <dxg:GridColumn FieldName="Percentage" Header="%" />
            <dxg:GridColumn FieldName="Amount" Header="Amount" ReadOnly="True"/>

            <dxg:GridControl.TotalSummary>
                <dxg:GridSummaryItem FieldName="Percentage" SummaryType="Sum"/>
                <dxg:GridSummaryItem FieldName="Amount" SummaryType="Sum"/>
            </dxg:GridControl.TotalSummary>
        </dxg:GridControl>

        <!-- Action Buttons -->
        <StackPanel Orientation="Horizontal" HorizontalAlignment="Right" Margin="10">
            <Button Content="Add Row" Command="{Binding AddChildCommand}" Margin="5"/>
            <Button Content="Save" Command="{Binding SaveCommand}" Margin="5"
                    IsEnabled="{Binding TotalPercentage, Converter={StaticResource EqualTo100Converter}}"/>
        </StackPanel>
    </DockPanel>
</Border>
```

---

### 4. Add `BoolToVisibilityConverter` in `App.xaml`

```xml
<Application.Resources>
    <local:EqualTo100Converter x:Key="EqualTo100Converter"/>
    <BooleanToVisibilityConverter x:Key="BoolToVisibilityConverter"/>
</Application.Resources>
```

---

## ✅ UX Behavior Now:

| Action                     | Result                     |
| -------------------------- | -------------------------- |
| Double-click on parent row | Loads and shows child grid |
| Close (✖) button           | Hides the child grid       |
| Add/Remove rows            | Updates total %            |
| Save only enabled          | If total % == 100          |

---

Would you like the next step to be:

* 🧵 Integrating this with **Entity Framework** to fetch/save child rows from the database?
* 🎨 Improve UI with ComboBoxes for `Category1/2/3` and dynamic styling?
* 💾 Show save confirmation/toast?

Let me know!




Great question!

The **`Amount` field** in each row of the child grid is **automatically calculated** based on the `Percentage` input and the **total amount from the selected parent row**.

---

## ✅ How It Works

In the `ChildItem` class:

```csharp
public class ChildItem : INotifyPropertyChanged
{
    // These are your dropdown fields
    public string Category1 { get; set; }
    public string Category2 { get; set; }
    public string Category3 { get; set; }

    private double percentage;
    public double Percentage
    {
        get => percentage;
        set
        {
            if (percentage != value)
            {
                percentage = value;
                OnPropertyChanged();
                UpdateAmount();  // This is the key!
            }
        }
    }

    private double amount;
    public double Amount
    {
        get => amount;
        private set
        {
            amount = value;
            OnPropertyChanged();
        }
    }

    public double ParentTotal { get; set; }  // Injected when row is added

    private void UpdateAmount()
    {
        Amount = Math.Round(ParentTotal * Percentage / 100.0, 2);
    }

    public event PropertyChangedEventHandler PropertyChanged;
    protected void OnPropertyChanged([CallerMemberName] string name = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
    }
}
```

---

## 🔁 Flow Summary

1. User types `20` in the **Percentage** column.
2. `Percentage` setter calls `UpdateAmount()`.
3. `UpdateAmount()` calculates:

   ```
   Amount = ParentTotal * (Percentage / 100)
   ```

   If `ParentTotal` = \$1500 and `Percentage` = 20, then:

   ```
   Amount = 1500 * (20 / 100) = $300
   ```
4. UI updates because of `OnPropertyChanged("Amount")`.

---

## 💡 When Is `ParentTotal` Set?

In your ViewModel when you **add a child row**:

```csharp
ChildItems.Add(new ChildItem
{
    ParentTotal = SelectedParent.TotalAmount
});
```

So the child knows how much the full amount is.

---

If you ever **change the parent row's total** after creating child rows, you should also **recalculate all the child row amounts** by calling `UpdateAmount()` for each row.

Want that logic too?

